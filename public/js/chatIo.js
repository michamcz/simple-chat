
$(document).ready(function () {

  var socket = io();

  $('form').submit(function () {
    socket.emit('reload');
  });

  socket.on('reload', function (msg) {
    
    setTimeout( () => { location.reload(); }, 1000);
  });

  $('.chat').scrollTop($('.chat')[0].scrollHeight);

});

