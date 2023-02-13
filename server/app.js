const config = require('./config/config');

var fs = require('fs');
var xpress = require('express');
var https = require('https');
const cors = require('cors');
const bodyParser = require('body-parser');


var db = require('./models');


var toJson = (data)=> JSON.parse(JSON.stringify(data));



var DBug =	console.log.bind(console, '<DEBUG>');
var Log =	console.log.bind(console);
var app = xpress();


var io;

function initIO(){// socket.io stuff here

	app.use(cors());
	app.use(bodyParser.json({limit: '50mb'}));
	app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
	var server = https.createServer({
		key: fs.readFileSync('/home/wesafe/letsencrypt/privkey.pem'),
		cert: fs.readFileSync('/home/wesafe/letsencrypt/fullchain.pem'),
		
	},app);

///socket.io senders
function Emit(socket,type,data){		//Emit to single instance of one client
	// console.log('sending: ',type, data);
	if(socket)
		socket.emit(type,data);
}



	server.listen(config.serverPort);

	io = require('socket.io')(server, { origins: '*:*',cookie: false, maxHttpBufferSize: 1e8});

	io.on('connection', function (socket) {
		console.log(io.engine.clientsCount," connected clients");//connection counter

		//send welcome
		Emit( socket,'welcome', {welcome: "kiwify IO Server connected"});



		socket.on('modules', function (data) {
			db.module.findAll({
				include: [
					{
						model: db.user
					},
					{
						model: db.content,
						include: [
							{
								model: db.attachment
							}
						]
					}
				]
			}).then(modules=>{
				modules = toJson(modules);
				Emit( socket,'modules', {success: true, data: modules});
			})
			
		});

		// client disconnects
		socket.on('disconnect', function (data) {//
			Log("disconnect - "+socket.id);
			socket.disconnect();
		});

	});



	DBug("IO ready");

	///////////////////////////////////////////
	/// /// /// /// /// /// /// /// /// /// ///
	///////////////////////////////////////////

}



/////////////////////////////
// Startup
/// each startup procedure must run "startup()" before it and "started()" in the callback or after execution.
/// ---------------------------------------------------------------------------------------------------------
var startcounter = 0;
function startup(){
	++startcounter;
}
function started(){
	--startcounter;
	//if(!startcounter) setTimeout(initIO,10e3); //start in 10 seconds -> allow for broker connection lag
	if(!startcounter) initIO();
}
/// ---------------------------------------------------------------------------------------------------------
/////////////////////////////

startup();
started();
