'use strict'
let articleArr = []
class article {
    constructor(username, time, tag, text, picture, share = 0, comment = 0, like = 0, portrait = './images/portrait-default/1.png') {
        this.username = username;
        this.time = time;
        this.tag = tag;
        this.text = text;
        this.picture = picture;
        this.portrait = portrait
        this.share = share;
        this.comment = comment;
        this.like = like
    }
    unshiftArr() {
        articleArr.unshift(this)
    }
}
let article1 = new article('哈哈哈', '25分钟前', '#科普', '世界不能没有狗', './images/article-demo/3.jpg', 21, 76, 33).unshiftArr()

let article2 = new article('jiayou', '15分钟前', '#求助', '家人们，狗狗不吃饭怎么办', './images/article-demo/2.jpg', 99, 102, 68, './images/portrait-default/2.png').unshiftArr()
let article3 = new article('平安', '3分钟前', '#众筹', '今天西门外捡到一只小猫咪，是个妹妹，不过他有一只脚受伤了，学生党没有太多钱，大伙众筹一下，我带猫猫去宠物医院看看', './images/article-demo/4.jpg', 56, 99, 1024, './images/portrait-default/2.png').unshiftArr()
let article4 = new article('OMG', '1分钟前', '#分享', '看看我新换的头像，可爱不，家人们', './images/portrait-default/2.png', 88, 234, 2048, './images/portrait-default/2.png').unshiftArr()
let article5 = new article('汪汪汪', '刚刚', '#分享', '【流浪狗每天护送小女孩回家，只因曾被她喂食过，被收养后笑得好甜】' +
    '照片中的这只狗狗名字叫瑞瑞，它之前是一只在路边的流浪狗，直到遇见了一位可爱的小女孩，就彻底改变了它的命运。' +
    '一天瑞瑞在路边的餐馆讨食的时候，被生气的老板赶了出来，正好遇见了刚放学回家的小女孩七七。七七目睹了流浪狗的遭遇后，很是心疼它，于是便把自己的零食分享给狗狗吃。虽然瑞瑞并不知道这零食是何种食物，还是大口大口的吃进了肚子里。七七看到它吃了，也就开心的回了家。' +
    '小女孩七七每天放学都是独自回家的，每天都要走那条必经之路。瑞瑞记住了七七的模样，从那时候开始，瑞瑞就开始跟在七七的身后，一直就这样护送着她回家，看到七七到了家之后，它就会安静的离开。' +
    '小女孩也对流浪狗有了感情，每次到了家之后，都会把家中的食物和水拿到门外喂给狗狗吃。从狗狗的眼神里，也能看出它渴望有个家，但是小女孩的妈妈是禁止家里养狗的，一次狗狗刚走进家门，立即就被妈妈给赶走了！' +
    '小女孩没有那么多戒备心，她只是觉得狗狗很可怜没有家，所以就会喂给它食物吃，当它最好的伙伴，和狗狗一起玩耍。但妈妈顾虑太多，认为流浪狗太脏，怕它会伤害小女孩，所以就直接拒绝了小女孩想养狗的想法。' +
    '小女孩没有放弃收养狗狗的想法，一直在央求妈妈，因为妈妈不答应，在家里哭了一晚上。后来妈妈最终答应了她的请求，第二天就带着狗狗去了医院，给它打疫苗做驱虫洗了澡。并告诉女儿，你是主人，一定要照顾好它哦，否则妈妈随时会反悔的！自从狗狗到了新家之后，小女孩和狗狗的笑容也都多了，为他们感到高兴，是你们彼此的善良，让我们看到了世上的美好！', './images/article-demo/1.jpg', 32, 66, 77).unshiftArr()
export default {
    banner: ['url(./images/banner/dog1.jpg)', 'url(./images/banner/dog2.jpg)', 'url(./images/banner/cat.jpg)', 'url(./images/banner/fish.jpg)', 'url(./images/banner/mouse.jpg)'],
    articleArr: articleArr,
}