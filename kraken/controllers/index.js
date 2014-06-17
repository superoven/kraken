'use strict';

var IndexModel = require('../models/index');

module.exports = function (app) {
    var model = new IndexModel();
    
    var server = app.listen(9000);
    var io = require('socket.io').listen(server);
    
    app.get('/', function (req, res) {
	res.render('index', model);
    });
    
    io.sockets.on('connection', function (socket) {
	socket.on('mousemove', function (data) {
	    socket.broadcast.emit('moving', data);
	});
    });
};
