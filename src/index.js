const micro = require('micro');
const http = require('http');
const replies = require("./replies")

const server = new http.Server(
    micro(async (req, res) => {
        if (req.method !== 'POST') {
            return 'Server is running';
        }
        const { request, session, state } = await micro.json(req);
        const sessionState = state && state.session || {};
        const response = session.new
            ? replies.welcome()
            : {
                text: `hello`,
                tts: `<speaker audio="alice-music-harp-1.opus">hello`,
                buttons: [
                    { title: 'Записать подарок', hide: true },
                    { title: 'Посмотреть подарок', hide: true },
                ],
                end_session: false
            };
        return {
            response,
            session_state: sessionState,
            version: '1.0'
        };
    })
);
const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}, tunnel: http://localhost:4040`));