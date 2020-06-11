const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'i', url: 'https://www.iconfont.cn'},
    {logo: 'C', url: 'https://cssgradient.io'},
]
const clearName = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容直到空
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
        console.log(index);
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${clearName(node.url)}</div>
                <div class="close"><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-close"></use>
                </svg></div>
            </div>
        </li>
    `).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation() // 阻止冒泡
            console.log(hashMap);
            hashMap.splice(index,1)
            render()
        })
    })
}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({logo: clearName(url)[0].toUpperCase(), logoType: 'text', url: url})
    render()
})
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress',(e)=>{
    const {key} = e
    for (let i = 0;i < hashMap.length;i++) {
        if (hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})