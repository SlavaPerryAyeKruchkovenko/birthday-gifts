/**
 * Приветственное сообщение при входе в навык.
 */
exports.welcome = () => {
    const welcome = getRandomElement(['Привет', 'Здравствуйте', 'Добрый день']);
    return {
        text: `${welcome}, я могу запомнить подарок который вы хотите получить`,
        tts: `<speaker audio="alice-music-harp-1.opus">${greeting}. Я ваш новый учитель математики. Начинаем урок?`,
        buttons: [
            { title: 'Записать подарок', hide: true },
            { title: 'Посмотреть подарок', hide: true },
        ],
        end_session: false
    };
};

function getRandomElement(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}