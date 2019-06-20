var mqlight = require('mqlight');


var recvClient = mqlight.createClient({service: 'amqp://va10dlvihs308.wellpoint.com(57084)'});

var topicPattern = 'public';
recvClient.on('started', function() {
  recvClient.subscribe(topicPattern);
  recvClient.on('message', function(data, delivery) {
    console.log('Recv: %s', data);
  });
});

