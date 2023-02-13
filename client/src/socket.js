import dataSpew from 'socket.io-client';
// import {configureStore} from './redux/store';

const socket = dataSpew('https://wesafe.com.au:8282');


///////////////////////////////////////////////////////////
////helper functions for server auth///////////////////////
let userStore;
// function getUser(){
// 	userStore = configureStore().getState().authUser.user;
// }

///////////////////////////////////////////////////////////
////automatic persistant server connection with auth///////
socket.on('welcome', data => {
	console.log(data.welcome)
	// getIDandLogin();//re/connect login
});
socket.on('disconnect', data => {
	console.log("disconnected");
	// loggedin = {}

});
let reconn = 0;
let loggedin = {};
socket.on('login', data => {
	// console.log("login response:",data)


});
///////////////////////////////////////////////////////////

function modules(cb, off){
	if(off){
		socket.off('modules');
	}else if(typeof cb === "function"){
		socket.off('modules').on('modules', cb); //implicitly passes 'data' to callback
	}else if(typeof cb == 'object'){
		socket.emit('modules',cb);
	}else {
		socket.emit('modules');
	}
}


export {
    modules,
	socket

};

