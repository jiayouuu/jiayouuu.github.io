const htmlElement = document.documentElement;
function setRem() {
    const htmlWidth = htmlElement.clientWidth;
    if (htmlWidth > 1226) {
        htmlElement.style.fontSize = 122.6 + 'px';
    } else {
        const htmlFontSize = htmlWidth / 10;
        htmlElement.style.fontSize = htmlFontSize + 'px';
    }

}
setRem();
window.addEventListener('resize', setRem);