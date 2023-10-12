"use strict"
import utils from "./utils.js"
import data from './data.js'
utils.preventContextmenu()
utils.preventScale()
utils.banner(data.banner)
let articleEl = document.querySelector('article')
//插入贴子 未完
for (let i = 0; i < data.articleArr.length; i++) {
    articleEl.innerHTML += `
    <div class="item">
            <div class="head">
                <div class="portrait">
                    <div class="icon" style="background: url(${data.articleArr[i].portrait}) no-repeat;
                    background-size: 100%;
                    background-position: center;"></div>
                </div>
                <div class="detail">
                    <div class="username">
                        ${data.articleArr[i].username}
                    </div>
                    <div class="time">${data.articleArr[i].time}</div>
                </div>
                <div class="concern">
                <span></span><span>关注</span>
                </div>
            </div>
            <div class="main">
                <div class="article" >
                    <span class="tag">${data.articleArr[i].tag}</span>${data.articleArr[i].text}
                    <div class="close">收起</div>
                </div>
                <div class="media">

                    <div class="picture" style="background: url(${data.articleArr[i].picture}) no-repeat; background-size:cover;background-position: center" >
                        <div class="close"></div>
                    </div>
                    <div class="video"></div>
                </div>
            </div>
            <div class="operation">
                <div class="share"><span></span><span>${data.articleArr[i].share}</span></div>
                <div class="comment"><span></span><span>${data.articleArr[i].comment}</span></div>
                <div class="like"><span></span><span>${data.articleArr[i].like}</span></div>
            </div>
            <div>`
}
let pictureEl = articleEl.querySelectorAll('.item .main .media .picture')
for (let i = 0; i < pictureEl.length; i++) {
    pictureEl[i].addEventListener('click', () => {
        pictureEl[i].style.width = '650px'
        pictureEl[i].style.height = '365px'
        pictureEl[i].children[0].style.display = 'block'
        pictureEl[i].children[0].addEventListener('click',event=>{
            event.stopImmediatePropagation()
            pictureEl[i].style.width='210px'
            pictureEl[i].style.height='210px'
            pictureEl[i].children[0].style.display = 'none'
        })
    })

}
let articlesEl = articleEl.querySelectorAll('.item .main .article')
for (let i = 0; i < articlesEl.length; i++) {
    articlesEl[i].addEventListener('click', () => {
        if(articlesEl[i].innerText.length<105)return
        articlesEl[i].style.maxHeight = '1000px'
        articlesEl[i].style.WebkitLineClamp = '500'
        articlesEl[i].children[1].style.display = 'block'
        articlesEl[i].children[1].addEventListener('click',event=>{
            event.stopImmediatePropagation()
            //在这里我不晓得为啥动画会消失
            articlesEl[i].style.maxHeight='100px'
            articlesEl[i].style.WebkitLineClamp = '4'
            articlesEl[i].children[1].style.display = 'none'
        })
    })

}
let returnTopEl = document.querySelector('.return-top')
utils.returnTop(returnTopEl)
//main nav 点击效果 未完
let mainNavEl = document.querySelector('main .nav')
utils.navClick(mainNavEl, 'nav-click')
//Nav点击效果 未完
let NavEl = document.querySelector('nav .content')
utils.navClick(NavEl, 'nav-click')
articleOperationClick()
//帖子 分享/评论/点赞 点击效果 未完
function articleOperationClick() {
    let operationEl = document.querySelectorAll('main article .item .operation')
    let likecount = 0
    let likeflag = false
    for (let j = 0; j < operationEl.length; j++) {
        for (let i = 0; i < operationEl[j].children.length; i++) {
            operationEl[j].children[i].addEventListener('mouseenter', () => {
                operationEl[j].children[i].classList.add('articleOperation-click')
            })
            operationEl[j].children[i].addEventListener('click', () => {
                if (i === 2) {
                    likecount++
                    if (likecount % 2 === 1) {
                        likeflag = true
                    } else {
                        likeflag = false
                    }
                }
            })
            operationEl[j].children[i].addEventListener('mouseleave', () => {
                if (i === 2 && likeflag) return
                operationEl[j].children[i].classList.remove('articleOperation-click')
            })
        }
    }
}
let loginEl = document.querySelector('header aside .login')
let registerEl = document.querySelector('header aside .register')
let asideEl = document.querySelector('aside')
let logoEl=document.querySelector('header .logo')
//点击logo刷新首页
logoEl.addEventListener('click',()=>{
    window.location.reload()
})
asideEl.addEventListener('click', event => {
    //点击登录跳转
    if (event.target === loginEl) {
        window.open('./login.html?1', '_self')
    }
    else if (event.target === registerEl) {
        window.open('./login.html?2', '_self')
    }
})
NavEl.addEventListener('click', (event) => {
    if (event.target.parentNode.classList.contains('publish')) {
        window.open('./publish.html', '_self')
    }
})
let concernEl = document.querySelectorAll('main article .item .head .concern')
for (let i = 0; i < concernEl.length; i++) {
    concernEl[i].addEventListener('click', () => {
        concernEl[i].textContent = '已关注'
        concernEl[i].transition = 'all .2s ease'
        setTimeout(() => [
            concernEl[i].style.opacity = '0'
        ], 1000)
    })
}
