module.exports = {
    username: 'yura',
    password: 'yura1605',
    database: 'Lab18',
    host: 'localhost',
    dialect: 'mssql',
    logging: false,
    enableArithAbort: true,
    trustServerCertificate: true,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
}