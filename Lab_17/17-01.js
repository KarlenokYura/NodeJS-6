var redis = require('redis');
var client = redis.createClient('//redis-18805.c9.us-east-1-2.ec2.cloud.redislabs.com:18805', {password: 'QulLD4jvoJ5fWizomFPGNljBOEQCfPhc'});

client.on('ready', () => {console.log('ready')});
client.on('error', (err) => {console.log('error '+ err)});
client.on('connect',() => {console.log('connect')});
client.on('end',() => {console.log('end')});
client.quit();