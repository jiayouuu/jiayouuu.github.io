"use strict"
import utils from "./utils.js"
utils.preventContextmenu()
utils.preventScale()
let NavEl = document.querySelector('nav .content')
utils.navClick(NavEl, 'nav-click',1)
NavEl.addEventListener('click',(event)=>{
    if(event.target.parentNode.classList.contains('find')){
        window.open('./index.html','_self')
    }
})
let publishMoreEl = document.querySelector('.publish .more')
utils.navClick(publishMoreEl,'nav-click')
let logoEl =document.querySelector('header .left .logo')
logoEl.addEventListener('click',()=>{
    window.open('./index.html','_self')
})
let publishEl =document.querySelector('main .publish-now')
publishEl.addEventListener('click',()=>{
    window.open('./index.html','_self')
})