const express = require('express');
const registerRoute = express.Router();
const Students = require('./../models');

registerRoute.get('/', (request, response) => {
    response.sendFile('register.html', {root: './views'});
});

registerRoute.post('/', (request, response) => {
    const {firstName, lastName} = request.body;
    const student = Students.createStudent({firstName, lastName});
    if (user) {
        response.redirect(`/home?id=${student.id}&firstName=${student.firstName}&lastName=${student.lastName}`);
    } else {
        response.status(404).end();
    }
});

module.exports = registerRoute;
