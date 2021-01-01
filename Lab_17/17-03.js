var redis = require('redis');
var client = redis.createClient('//redis-18805.c9.us-east-1-2.ec2.cloud.redislabs.com:18805', {password: 'QulLD4jvoJ5fWizomFPGNljBOEQCfPhc'});

client.set('incr', 0);

var incrtime;
client.incr('incr', () => {
    incrtime = new Date();
})
for (var n = 1; n < 9999; n++) { 
    client.incr('incr');
}
client.incr('incr', () => {
    console.log('Time incr: '+ (new Date() - incrtime));
})

var decrtime;
client.decr('incr', () => {
    decrtime = new Date();
})
for (var n = 1; n < 9999; n++) { 
    client.decr('incr');
}
client.decr('incr', () => {
    console.log('Time decr: '+ (new Date() - decrtime));
})
client.del('incr');
client.quit();