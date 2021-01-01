const JsonRPCServer = require('jsonrpc-server-http-nats');
const server = new JsonRPCServer();
const config = {
    host: 'localhost',
    port: 3000
};

let MultiValidator = (param, response) => {
    if(!Array.isArray(param)){
        throw new Error(`It's not Array: ` + param);
    }

    return param;
};

let BinValidator = (param, response) => {
    if(!Array.isArray(param)){
        throw new Error(`It's not Array: ` + param);
    }
    if(param.length != 2){
        throw new Error(`More then 2 params, params count: ` + param.length);
    }

    return param;
};

server.on('sum', MultiValidator, (params, channel, response) => {
    response(null, params.reduce((a, b) => a + b));
});

server.on('mul', MultiValidator, (params, channel, response) => {
    response(null, params.reduce((a, b) => a * b));
});

server.on('div', BinValidator, (params, channel, response) => {
    response(null, params.reduce((a, b) => a / b));
});

server.on('proc', BinValidator, (params, channel, response) => {
    response(null, params[0] * 100 / params[1]);

});

server.listenHttp({host: config.host, port: config.port}, () => {
    console.log(`Listening to http://${config.host}:${config.port}`);
});
