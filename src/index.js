const micro = require('micro');
const http = require('http');

const server = new http.Server(
    micro(async (req, res) => {
        return 'Running';
    })
);
const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}, tunnel: http://localhost:4040`));