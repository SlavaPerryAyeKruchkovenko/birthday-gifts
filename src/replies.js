/**
 * Приветственное сообщение при входе в навык.
 */
exports.sendWelcome = () => {
    const welcome = getRandomElement(['Привет', 'Здравствуйте', 'Добрый день']);
    return {
        response:{
            text: `${welcome}, я могу запомнить подарок который вы хотите получить`,
            tts: `<speaker audio="alice-music-harp-1.opus">${welcome}. Я ваш новый учитель математики. Начинаем урок?`,
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
            text: `Напишите что вы хотите ${want}`,
            tts: `<speaker audio="alice-music-harp-1.opus">Скажите что ${want}`,
            end_session: false
        },
        user_state_update:{
            value:1
        },
        version: '1.0'
    }
}
exports.writeGift = (request, user_id) =>{
    const add = getWordEnd(request, "добавлен")
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
        case "a":
            return reply + "a"
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