/**
 * Приветственное сообщение при входе в навык.
 */
exports.sendWelcome = () => {
    const welcome = getRandomElement(['Привет', 'Здравствуйте', 'Добрый день']);
    return {
        text: `${welcome}, я могу запомнить подарок который вы хотите получить`,
        tts: `<speaker audio="alice-music-harp-1.opus">${welcome}. Я ваш новый учитель математики. Начинаем урок?`,
        buttons: [
            { title: 'Записать подарок', hide: true },
            { title: 'Посмотреть подарки', hide: true },
        ],
        end_session: false
    };
};

exports.sendWriteGift = () => {
    const want = getRandomElement(['вы хотите', 'вы желаете', 'вам нужно']);
    return {
        text: `Напишите что вы хотите ${want}`,
        tts: `<speaker audio="alice-music-harp-1.opus">Скажите что ${want}`,
        end_session: false
    };
}

function getRandomElement(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}