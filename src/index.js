const micro = require('micro');
const http = require('http');
const replies = require("./replies")

const server = new http.Server(
    micro(async (req, res) => {
        try{
            const {request, session} = await micro.json(req)
            const my_response = session.new
                ? replies.welcome()
                : {
                    text: `Выполняю ${request.command}`,
                    tts: `<speaker audio="alice-music-harp-1.opus">Выполняю ${request.command}`,
                    buttons: [
                        { title: 'Записать подарок', hide: true },
                        { title: 'Посмотреть подарок', hide: true },
                    ],
                    end_session: false
                };
            return {
                response: my_response,
                version: '1.0'
            }
        }
        catch (e){
            return{
                response: {
                    text: 'Произошла ошибка',
                    end_session: false
                },
                version: '1.0'
            }
        }
    })
)
const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}, tunnel: http://localhost:4040`))