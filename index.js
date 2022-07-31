const micro = require('micro')
const http = require('http')
const replies = require("./src/replies")
const database = require("./src/database")

const server = new http.Server(
    micro(async (req, res) => {
        database.sync().then(()=>{console.log("db is ready")})
        if (req.method !== 'POST') {
            return 'Server is running';
        }
        try{
            const {request, session, state} = await micro.json(req)
            return session.new
                ? replies.sendWelcome()
                : getResponse(request.command,session, state)
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
const getResponse = (request, session, state)=> {
    if(checkOnReply(["записать","запиши","запомни","запомнить"],request)){
        return replies.sendWriteGift()
    }else if(state.user.value === 1){
        return replies.writeGift(request, session.user.user_id)
    }else if(checkOnReply(["показать","посмотреть","покажи","посмотри"],request)){
        return replies.sendGifts()
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