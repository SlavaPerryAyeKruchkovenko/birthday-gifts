const gift = require("./Models/gift")

exports.sendWelcome = () => {
    const welcome = getRandomElement(['Привет', 'Здравствуйте', 'Добрый день']);
    return {
        response:{
            text: `${welcome}, я могу запомнить подарок который вы хотите получить`,
            tts: `<speaker audio="alice-music-harp-1.opus">${welcome}, я могу запомнить подарок который вы хотите получить`,
            buttons: [
                { title: 'Записать подарок', hide: true },
                { title: 'Посмотреть подарки', hide: true },
            ],
            end_session: false
        },
        version: '1.0'
    }
};

exports.sendWriteGift = () => {
    const want = getRandomElement(['вы хотите', 'вы желаете', 'вам нужно']);
    return {
        response:{
            text: `Напишите что ${want}`,
            tts: `<speaker audio="alice-music-harp-1.opus">Скажите что ${want}`,
            end_session: false
        },
        user_state_update:{
            value:1
        },
        version: '1.0'
    }
}
exports.writeGift = async (request, user_id) =>{
    const add = getWordEnd(request, "добавлен")
    await gift.create({
        user_id: user_id,
        gift_name: add
    })
    return {
        response:{
            text: `${request} ${add} в список`,
            tts: `<speaker audio="alice-music-harp-1.opus">${request} ${add} в список`,
            buttons: [
                { title: 'Записать подарок', hide: true },
                { title: 'Посмотреть подарки', hide: true },
            ],
            end_session: false
        },
        user_state_update:{
            value:0
        },
        version: '1.0'
    }
}
exports.sendGifts = async u_id=>{
    const gifts = await gift.findAll({
        where: { user_id: u_id }
        }
    ).then(async ()=>{(await gift.findAll({attributes: ['gift_name']})).forEach(x=>console.log(x))})
    const text =
        getRandomElement(['список желаемых подарков', 'ваш вишлист', 'вы хотите'])
        + ":" + gifts.map(x=>x.gift_name).join('\n')

    return {
        response:{
            text: text,
            tts: `<speaker audio="alice-music-harp-1.opus">${text}`,
            buttons: [
                { title: 'Записать подарок', hide: true },
            ],
            end_session: false
        },
        user_state_update:{
            value:0
        },
        version: '1.0'
    }
}
exports.sendAnother = ()=>{
    return {
        response:{
            text: `что-то пошло не так`,
            tts: `что-то пошло не так`,
            end_session: true
        },
        version: '1.0'
    }
}
function getWordEnd(word, reply){
    switch (word[word.length-1]){
        case "а":
            return reply + "а"
        case "ы":
            return reply + "ы"
        case "и":
            return reply + "ы"
        case "о":
            return reply + "о"
        default:
            return reply
    }
}
function getRandomElement(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}