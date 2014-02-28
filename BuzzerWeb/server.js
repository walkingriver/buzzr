(function () {
    var express = require('express'),
        http = require('http'),
        winner = '',
        players = {},
        app = express(),
        server = http.createServer(app),
        io = require('socket.io')
            .listen(server);

    app.configure(setupApp);
    server.listen(8080);
    io.sockets.on('connection', onClientConnected);

    function setupApp() {
        app.use(app.router);
        app.use(express.static('public'));
    }

    function onClientConnected(client) {
        // Let's capture the client ID in a closure
        var clientId = client.id,
        player = {id: clientId, name: ''};

        console.log('Player connected: ' + clientId);

        // Push our player onto our local list
        players[clientId] = player;

        // These set up event handlers for newly connected client.
        client.on('announce', onAnnounce);
        client.on('buzz', onBuzz);
        client.on('reset', onReset);
        client.on('disconnect', onDisconnect);

        // These are the actual event handlers.
        function onAnnounce(data) {
            console.log('Player announced: ' + clientId + '=' + data.name);

            // Update our player in our local list
            player.name = data.name;

            // io.socket.emit sends to every connected client.
            // Every time someone connects, this sends the list of winners and all players to EVERYONE.
//        io.sockets.emit('info', {winner: winner, players: playerList });

            // This should send the winner and list of players only to the newly connected client.
            io.sockets.socket(clientId).emit('info', {winner: winner, playerId: clientId, players: players});

            // client.broadcast.emit sends a message to everyone BUT the caller.
            client.broadcast.emit('playerConnected', player);
        }

        function onBuzz(data) {
            console.log('Server received a buzz from user ' + data.userId);
            if (!winner) {
                console.log('Server sending winner info for ' + data.userId);
                winner = data.userId;

                // This tells EVERYONE who the winner is
                io.sockets.emit('winner', {winner: winner});
            }
        }

        function onReset(data) {
            console.log('Server received a reset');
            winner = '';

            // This tells EVERYONE to reset
            io.sockets.emit('reset');
            console.log('Server sending reset');
        }

        function onDisconnect(data) {
            console.log('Player disconnected: ' + clientId);

            // This tells EVERYONE that a player disconnected.
            io.sockets.emit('playerDisconnected', {clientId: clientId});
        }
    }
})();

