var redis = require('redis');
var sub_client = redis.createClient('//redis-18805.c9.us-east-1-2.ec2.cloud.redislabs.com:18805', {password: 'QulLD4jvoJ5fWizomFPGNljBOEQCfPhc'});

sub_client.on('subscribe', (channel, count) => {
    console.log('Subscribe: channel = ' + channel + ', count = ' + count)
});
sub_client.on('message', (channel, message) => {
    console.log('sub channel: ' + channel + ' : ' + message)
});

sub_client.subscribe('channel-01');
setTimeout(() => {
    sub_client.unsubscribe();
    sub_client.quit();
}, 50000);

var pub_client = redis.createClient('//redis-18805.c9.us-east-1-2.ec2.cloud.redislabs.com:18805', {password: 'QulLD4jvoJ5fWizomFPGNljBOEQCfPhc'});

pub_client.publish('channel-01', 'from pub_client message 1');
setTimeout(() => pub_client.publish('channel-01', 'from pub_client message 2'), 10000);
setTimeout(() => pub_client.publish('channel-01', 'from pub_client message 3'), 20000);
setTimeout(() => pub_client.publish('channel-01', 'from pub_client message 4'), 30000);
setTimeout(() => pub_client.publish('channel-01', 'from pub_client message 5'), 40000);
setTimeout(() => pub_client.quit(), 50000);