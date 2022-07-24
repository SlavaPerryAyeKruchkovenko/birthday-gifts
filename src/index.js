const micro = require('micro');
const http = require('http');
const replies = require("./replies")

const server = new http.Server(
    micro(async (req, res) => {
        if (req.method !== 'POST') {
            return 'Server is running';
        }
        try{
            const {request, session, state} = await micro.json(req)
            return session.new
                ? replies.sendWelcome()
                : getResponse(request.command, state)
        }
        catch (e){
            return{
                response: {
                    text: `${e}`,
                    end_session: false
                },
                version: '1.0'
            }
        }
    })
)
const getResponse = (request, state)=> {
    if(checkOnReply(["записать","запиши","запомни","запомнить"],request)){
        return replies.sendWriteGift()
    }else{
        return replies.sendAnother()
    }
}
const checkOnReply = (keyWords,request)=>{
    const text = request.toLowerCase()
    return !(keyWords.find(x=> text.includes(x)) === undefined)
}
const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}, tunnel: http://localhost:4040`))