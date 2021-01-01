var redis = require('redis');
var client = redis.createClient('//redis-18805.c9.us-east-1-2.ec2.cloud.redislabs.com:18805', {password: 'QulLD4jvoJ5fWizomFPGNljBOEQCfPhc'});

var settime;
client.set(0,'setn',() => {
    settime = new Date();
});
for (var n = 1; n < 9999; n++) { 
    client.set(n, 'setn');
}
client.set(9999, 'setn', () => {
    console.log('Time set: ' + (new Date() - settime));
});

var gettime;
client.get(0, () => {
    gettime = new Date();
})
for (var n = 1; n < 9999; n++) { 
    client.get(n);
}
client.get(9999, () => {
    console.log('Time get: '+ (new Date() - gettime));
})

var deltime;
client.del(0, () => {
    deltime = new Date();
})
for (var n = 1; n < 9999; n++) { 
    client.del(n);
}
client.del(9999, () => {
    console.log('Time del: '+ (new Date() - deltime));
})
client.quit();