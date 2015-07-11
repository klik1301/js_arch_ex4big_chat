(function(){
  var socket = io(crudURL);

  socket.on('connect', function(){

    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

  dispatcher.register(function(event){
    switch (event.name){
      case "LOGIN":
        socket.emit('add user', event.value);
        break;
      case "MY_NEW_MESSAGE":
        socket.emit('new message', event.message);
        break;


      default:
        break;
    }
  });

  socket.on('login', function(data){
    dispatcher.dispatch({name: "LOGGED", value: data.numUsers});
  });

  socket.on('new message', function(data){
    dispatcher.dispatch({name: "USERS_NEW_MESSAGE", username: data.username, message: data.message});
  });



  socket.on('user joined', function(data){
    dispatcher.dispatch({name: "USER_JOINED", username: data.username, numUsers: data.numUsers});
  });

  socket.on('user left', function(data){
    dispatcher.dispatch({name: "USER_LEFT", username: data.username, numUsers: data.numUsers});
  });








})();