const micro = require('micro');
const http = require('http');

const server = new http.Server(
    micro(async (req, res) => {
        return {
            response: {
                text: 'Привет',
                tts: '<speaker audio="alice-music-harp-1.opus">Привет, я ваш голосовой помощник',
                buttons: [
                    { title: 'Здравствуй', hide: true },
                    { title: 'Как дела?', hide: true },
                ],
                end_session: false
            },
            version: '1.0'
        };
    })
);
const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}, tunnel: http://localhost:4040`));