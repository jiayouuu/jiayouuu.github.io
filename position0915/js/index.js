//上一个展示的索引
var previous = 0
//点击按钮后展示的索引
var current = 0
//定时器
var TimerId = null
var mainEl = document.querySelector(".main")
//获取播放图片并转换为数组
var demoEls = Array.from(document.querySelectorAll(".demo"))
//定位刷新
rePosition()
var btnForwardEl = document.querySelector(".forward")
var btnBackEl = document.querySelector(".back")
mainEl.addEventListener("click", function (event) {
    //点击向前
    if (event.target === btnForwardEl) {
        //一三行防止自动播放与按钮点击播放冲突，因为过渡时间比自动播放时间断，故不用监听过渡结束后再添加自动播放
        clearInterval(TimerId)
        forward()
        autoPlay()
    }
    //点击向后
    else if (event.target === btnBackEl) {
        //一三行防止自动播放与按钮点击播放冲突
        clearInterval(TimerId)
        back()
        autoPlay()
        //点击小圆点
    }
    else {
        clickNav()
    }
})
var footNavEl = document.querySelector(".foot-nav")
//根据轮播的图片数量，增加底部小圆点数量
for (i = 0; i < demoEls.length; i++) {
    var spanEl = document.createElement("span")
    footNavEl.append(spanEl)
}
var spanEls = Array.from(footNavEl.querySelectorAll("span"))
focus(current)
//自动播放
autoPlay()
var sectionEl = mainEl.querySelector("section")
//鼠标进入停止自动播放
sectionEl.addEventListener("mouseenter", function () {

    clearInterval(TimerId)
})
//鼠标离开继续自动播放
sectionEl.addEventListener("mouseleave", autoPlay)
// 禁止右键
document.addEventListener("contextmenu", function (event) {
    event.preventDefault()
})
//定位刷新
function rePosition() {
    for (i = 0; i < demoEls.length; i++) {
        if (i < current) {
            demoEls[i].style.left = "-100%"
        }
        else if (i > current) {
            demoEls[i].style.left = "100%"
        }
        else {
            demoEls[i].style.left = "0"
        }
    }
}
//底部小圆点聚焦刷新
function focus(number) {
    var prSpanEl = footNavEl.querySelector(".foot-nav-focus")
    if (prSpanEl) {
        prSpanEl.classList.remove("foot-nav-focus")
    }
    spanEls[number].classList.add("foot-nav-focus")

}
//动画刷新
function reTranistion() {
    demoEls[previous].style.transition = "left .2s ease"
    for (i = 0; i < demoEls.length; i++) {
        if (demoEls[i] != demoEls[previous]) {
            demoEls[i].style.transition = "none"
        }
    }
    demoEls[current].style.transition = "left .2s ease"
}
//向前滚动
function forward() {
    previous = current
    current++
    if (current === demoEls.length) {
        current = 0
    }
    reTranistion()
    focus(current)
    rePosition()
}
//向后滚动
function back() {
    previous = current
    current--
    if (current === -1) {
        current = demoEls.length - 1
    }

    reTranistion()
    focus(current)
    rePosition()
}
//点击底部小圆点滚动
function clickNav() {
    //点击小圆点的索引
    var index = spanEls.findIndex(function (items) {
        return items === event.target
    })
    //如果没有点击小圆点，退出
    if (index === -1) return
    previous = current
    current = index
    reTranistion()
    focus(current)
    rePosition()
}
//自动滚动播放
function autoPlay() {
    TimerId = setInterval(forward, 2000)
}

