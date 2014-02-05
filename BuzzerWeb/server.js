(function () {
    var express = require('express'),
        http = require('http'),
        winner = '',
        app = express(),
        server = http.createServer(app),
        io = require('socket.io')
            .listen(server);

    app.configure(setupApp);
    server.listen(8080);
    io.sockets.on('connection', setupSocket);

    function setupApp() {
        app.use(app.router);
        app.use(express.static('public'));
    }

    function setupSocket(socket) {
        io.sockets.emit('info', {hello: 'world'});
        socket.on('buzz', onBuzz);
        socket.on('reset', onReset);

        function onBuzz(data) {
            console.log('Server received a buzz from user ' + data.userId);
            if (!winner) {
                console.log('Server sending winner info for ' + data.userId);
                winner = data.userId;
                io.sockets.emit('winner', {winner: winner});
                return;
            }
        }

        function onReset(data) {
            console.log('Server received a reset');
            winner = '';
            io.sockets.emit('reset');
            console.log('Server sending reset');
        }
    }
})();

