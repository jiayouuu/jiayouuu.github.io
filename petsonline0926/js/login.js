"use strict"
import utils from "./utils.js"
utils.preventContextmenu()
utils.preventScale()
let loginEl = document.querySelector('main .login')
let registerEl = document.querySelector('main .register')
let registerElInLogin = loginEl.querySelector('.noaccount div:nth-child(2)')
let loginElInRegister = registerEl.querySelector('.haveaccount div:nth-child(2)')
let flag = window.location.search
if (flag === '?1') {
    registerEl.style.transform = 'rotate(90deg)'
    registerEl.style.zIndex = '1'
    loginEl.style.zIndex = '0'
}
else if (flag === '?2') {
    loginEl.style.transform = 'rotate(90deg)'
    loginEl.style.zIndex = '1'
    registerEl.style.zIndex = '0'
}
console.log('不要问我为啥每次要隔这么久点击才能切换，因为不隔这么久切换会闪一下，且切换失败，我不知道为啥会这样~~~~~~')
let dateTemp = Date.now()
registerElInLogin.addEventListener('click', () => {
    let newDate = Date.now()
    //我也不知道为啥要隔1200，不然会闪屏，不应该一个动画周期600就好了吗  下同
    if (newDate - dateTemp < 1200) return
    dateTemp = newDate
    registerEl.style.transition = 'all .6s ease-in-out'
    registerEl.style.transform = 'rotate(0)'
    registerEl.addEventListener('transitionend', () => {
        loginEl.style.transition = 'none'
        loginEl.style.transform = 'rotate(90deg)'
        setTimeout(() => {
            loginEl.style.zIndex = '1'
            registerEl.style.zIndex = '0'
        }, 0)
    })
})
loginElInRegister.addEventListener('click', () => {
    let newDate = Date.now()
    //同上
    if (newDate - dateTemp < 1200) return
    dateTemp = newDate
    loginEl.style.transition = 'all .6s ease-in-out'
    loginEl.style.transform = 'rotate(0)'
    loginEl.addEventListener('transitionend', () => {
        registerEl.style.transition = 'none'
        registerEl.style.transform = 'rotate(90deg)'
        setTimeout(() => {
            registerEl.style.zIndex = '1'
            loginEl.style.zIndex = '0'
        }, 0)
    })

})
let selectEls = registerEl.querySelectorAll('.birthday select')
let year = (new Date()).getFullYear()
for (let i = year; i >= 1900; i--) {
    let optionEl = document.createElement('option')
    optionEl.textContent = i
    optionEl.value = `${i}`

    selectEls[0].append(optionEl)
}
for (let i = 1; i <= 12; i++) {
    let optionEl = document.createElement('option')
    optionEl.textContent = i
    optionEl.value = `${i}`
    selectEls[1].append(optionEl)
}
//大月1 3 5 7 8 10 12
//小月2 4 6 9 11
//平年28
//闰年29
February()
selectEls[2].addEventListener('focus', () => {
    February()
})
//填充二月
function February(){
    selectEls[2].innerHTML = null
    let year = Number(selectEls[0].value)
    let month = Number(selectEls[1].value)
    let bigMonth = [1, 3, 5, 7, 8, 10, 12]
    if (bigMonth.includes(month)) {
        for (let i = 1; i <= 31; i++) {
            let optionEl = document.createElement('option')
            optionEl.textContent = i
            optionEl.value = `${i}`
            selectEls[2].append(optionEl)
        }

    } else {
        if (month === 2) {
            if (utils.isRunYear(year)) {
                for (let i = 1; i <= 29; i++) {
                    let optionEl = document.createElement('option')
                    optionEl.textContent = i
                    optionEl.value = `${i}`
                    selectEls[2].append(optionEl)
                }
                return
            } else {
                for (let i = 1; i <= 28; i++) {
                    let optionEl = document.createElement('option')
                    optionEl.textContent = i
                    optionEl.value = `${i}`
                    selectEls[2].append(optionEl)

                }
                return
            }

        }
        for (let i = 1; i <= 30; i++) {
            let optionEl = document.createElement('option')
            optionEl.textContent = i
            optionEl.value = `${i}`
            selectEls[2].append(optionEl)
        }

    }
}