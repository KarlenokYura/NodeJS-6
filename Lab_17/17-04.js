var redis = require('redis');
var client = redis.createClient('//redis-18805.c9.us-east-1-2.ec2.cloud.redislabs.com:18805', {password: 'QulLD4jvoJ5fWizomFPGNljBOEQCfPhc'});

var hsettime;
client.hset('incr', 0, JSON.stringify({id:0, val:'val-0'}), () => {
    now = new Date();
});
for (var n = 1; n < 9999; n++) { 
    client.hset('incr', n, JSON.stringify({id:n, val:'val-' + n}));
}
client.hset('incr', 9999, JSON.stringify({id:9999, val:'val-9999'}), () => {
    console.log('Time hset: ' + (new Date() - now));
});

var hgettime;
client.hget('incr', 0, (err, result) => {
    hgettime = new Date();
})
for (var n = 1; n < 9999; n++) { 
    client.hget('incr', n);
}
client.hget('incr', 9999, () => {
    console.log('Time hget: ' + (new Date() - hgettime));
})

var hdeltime;
client.hdel('incr', 0, () => {
    hdeltime = new Date();
})
for (let n = 1; n < 9999; n++) { 
    client.hdel('incr', n);
}
client.hdel('incr',9999, () => {
    console.log('Time hdel: '+ (new Date() - hdeltime));
})
client.quit();