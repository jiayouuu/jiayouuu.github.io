'use strict'
export default {
    //禁止右键详情
    preventContextmenu: function () {
        document.addEventListener('contextmenu', event => {
            event.preventDefault()
        })
    },
    //禁止页面缩放
    preventScale: function () {
        //对不起我写的屎山，呜呜呜···
        //按下'Ctrl'键的标志
        let ctrldownflag = false
        //记录按下'Ctrl'键及'-''+'键的情况
        let keyarr = []
        document.addEventListener('keydown', event => {
            //如果按下的是'Ctrl'则继续
            if (event.keyCode === 17 || keyarr.includes(17)) {
                ctrldownflag = true
                //如果按下的不是上述按键则退出
                if (!(event.keyCode === 17 || event.keyCode === 187 || event.keyCode === 189)) {
                    return
                }
                //将合规按键记入数组
                keyarr.push(event.keyCode)
                //如果同时按了'Ctrl'及'-'或'+'，禁止原行为（缩放）
                if (keyarr.includes(17) && (keyarr.includes(187) || keyarr.includes(189))) {
                    event.preventDefault()
                }
            } else {
                return
            }
        })
        //抬起'Ctrl'
        document.addEventListener('keyup', event => {
            if (event.keyCode === 17) {
                ctrldownflag = false
                keyarr = []
            }
        })
        //'Ctrl'和鼠标滚轮
        //有bug
        document.addEventListener('wheel', (event) => {
            if (ctrldownflag) {
                event.preventDefault()
                window.scrollBy({
                    top: event.deltaY,
                    left: 0,
                    behavior: 'instant'
                })
            }
        }, { passive: false })
    },
    //轮播图
    banner: function (arr) {

        //写完才发现不对劲，不想改了，又不是不能用
        let itemsEl = document.querySelector('.items')
        //获取轮播数量
        let itemsCount = arr.length
        //插入图片
        for (let i = 0; i < itemsCount; i++) {
            let item = document.createElement('div')
            item.classList.add(`item${i}`)
            item.style.background = arr[i]
            itemsEl.append(item)
        }
        let itemsNav = document.querySelector('.items-nav')
        itemsNav.style.width = `${itemsCount * 25}px`
        //创建底部小圆点
        createItemNavs()
        //设置每个轮播图位置
        positionLeft()
        //点击后播放的轮播图索引
        let currentIndex = 0
        //上一个播放的 轮播图 索引
        let preIndex = 0
        //底部小圆点聚焦
        itemsNavFocus(currentIndex)
        let bannerEl = document.querySelector('.banner')
        let backEl = document.querySelector('.back')
        let forwardEl = document.querySelector('.forward')
        bannerEl.addEventListener('click', event => {
            //向后滚动
            if (event.target === backEl) {
                backPlay()
            }
            //向前滚动
            else if (event.target === forwardEl) {
                forwardPlay()
                //点击底部小圆点滚动
            } else {
                let itemsNavsEl = Array.from(itemsNav.children)
                //获取点击小圆点索引
                let indexcount = itemsNavsEl.findIndex(item => {
                    return event.target === item
                })
                if (indexcount === -1) {
                    return
                    //切换
                } else {
                    if (currentIndex === indexcount) return
                    focusPlay(indexcount)

                }
            }
        })
        //设置时间id
        let timerID = null
        let pretime = 0
        //自动轮播
        autoplay()
        //鼠标进入停止轮播
        bannerEl.addEventListener('mouseenter', () => {
            clearInterval(timerID)
        })
        //鼠标离开开始轮播
        bannerEl.addEventListener('mouseleave',
            autoplay
        )
        //轮播图切换
        function switchItem() {
            itemsEl.style.transition = 'all .2s ease'
            itemsEl.style.transform = `translateX(${-100 * currentIndex}%)`
            itemsNavFocus(currentIndex)
        }
        //小圆点导航聚焦
        function itemsNavFocus(number) {
            if (!(number >= 0 && number <= itemsCount - 1)) return
            let preItemsNav = itemsNav.querySelector('.items-nav-focus')
            if (preItemsNav) {
                preItemsNav.classList.remove('items-nav-focus')
            }
            itemsNav.children[number].classList.add('items-nav-focus')
        }
        //监听到动画结束后平移到正确位置，并删除辅助元素
        function ReLeft(item) {
            itemsEl.addEventListener('transitionend', () => {
                itemsEl.style.transition = 'none'
                itemsEl.style.transform = `translateX(${-100 * currentIndex}%)`
                item.remove()
            })
        }
        //向前滚动
        function forwardPlay() {
            let clicktime = Date.now()
            if (clicktime - pretime < 200) return
            pretime = clicktime
            currentIndex++
            switchItem()
            if (currentIndex === itemsCount) {
                currentIndex = 0
                itemsNavFocus(currentIndex)
                //克隆首位轮播图放置末尾  播放结束后删除，下同
                let firstItemEl = itemsEl.children[0].cloneNode(true)
                itemsEl.append(firstItemEl)
                firstItemEl.style.left = `${100 * itemsCount}%`
                ReLeft(firstItemEl)
            }
        }


        //向后滚动
        function backPlay() {
            let clicktime = Date.now()
            if (clicktime - pretime < 200) return
            pretime = clicktime
            currentIndex--
            switchItem()
            if (currentIndex === -1) {
                currentIndex = itemsCount - 1
                itemsNavFocus(currentIndex)
                //克隆末位轮播图放置前部
                let lastItemEl = itemsEl.children[itemsCount - 1].cloneNode(true)
                itemsEl.append(lastItemEl)
                lastItemEl.style.left = '-100%'
                ReLeft(lastItemEl)
            }
        }
        //点击底部小圆点滚动
        function focusPlay(indexcount) {
            preIndex = currentIndex
            currentIndex = indexcount
            let currentItemEl = itemsEl.children[currentIndex].cloneNode(true)
            itemsEl.append(currentItemEl)
            //向后
            if (currentIndex > preIndex) {
                currentItemEl.style.left = `${(preIndex + 1) * 100}%`
                // currentItemEl.style.zIndex = '1'
                itemsEl.style.transition = 'all .2s ease'
                itemsEl.style.transform = `translateX(${-100 * (preIndex + 1)}%)`
                itemsNavFocus(currentIndex)
                ReLeft(currentItemEl)


            }
            //向前
            else {
                currentItemEl.style.left = `${(preIndex - 1) * 100}%`
                // currentItemEl.style.zIndex = '1'
                itemsEl.style.transition = 'all .2s ease'
                itemsEl.style.transform = `translateX(${-100 * (preIndex - 1)}%)`
                itemsNavFocus(currentIndex)
                ReLeft(currentItemEl)
            }
        }
        //设置每个item的位置
        function positionLeft() {
            for (let i = 0; i < itemsCount; i++) {
                itemsEl.children[i].style.left = `${i * 100}%`
            }
        }
        //创建小圆点导航
        function createItemNavs() {
            for (let i = 0; i < itemsCount; i++) {
                let spanEl = document.createElement('span')
                itemsNav.append(spanEl)
            }
        }
        //自动轮播
        function autoplay() {
            timerID = setInterval(forwardPlay, 2000);
        }
    },
    //回到顶部
    returnTop: function (El) {
        let dateTemp = 0
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 300) {
                El.style.display = 'block'
                //异步执行
                setTimeout(() => {
                    El.style.opacity = '1'
                    dateTemp = Date.now()

                }, 0)

            } else {
                El.style.opacity = '0';
                // 不应该只用隔一个过渡周期事件吗
                // 为啥这都能有bug,我不理解
                El.addEventListener('transitionend', () => {
                    if ((Date.now() - dateTemp) < 250) return
                    else { El.style.display = 'none' }

                })
            }
        })
        El.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'

            })
        })
    },
    //nav 点击效果
    navClick: (navEl, styles, index = 0) => {
        let currentindex = index
        navEl.children[currentindex].classList.add(styles)
        for (let i = 0; i < navEl.children.length; i++) {
            navEl.children[i].addEventListener('mouseover', () => {
                navEl.children[i].classList.add(styles)
            }, true)
            navEl.children[i].addEventListener('click', () => {
                let preEl = navEl.querySelectorAll(`.${styles}`)
                for (let i = 0; i < preEl.length; i++) {
                    preEl[i].classList.remove(styles)
                }
                navEl.children[i].classList.add(styles);
                currentindex = i
            }, true)
            navEl.children[i].addEventListener('mouseout', () => {
                // (()=>{
                //     if(currentindex===i)return
                //     console.log('remove2')
                //     navEl.children[i].classList.remove('Nav-focus')
                //    })()
                if (currentindex === i) return
                navEl.children[i].classList.remove(styles)
            }, true)
        }
    },
    //如果是闰年返回ture 否则返回flase
    isRunYear: (year) => {
        let flag = false;
        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
            flag = true;
        }
        return flag;
    },
}
