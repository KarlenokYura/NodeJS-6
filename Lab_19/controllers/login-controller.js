const express = require('express');
const loginRoute = express.Router();
const Students = require('./../models');

loginRoute.get('/', (request, response) => {
    response.sendFile('login.html', {root: './views'});
});

loginRoute.post('/', (request, response) => {
    const {firstName, lastName} = request.body;
    console.log(request.body);
    const student = Students.getStudentByFirstName(firstName);
    if (!student || student.lastName !== lastName) {
        response.status(403).sendFile('login.html', {root: './views'});
    } else {
        response.redirect(`/home?id=${student.id}&firstName=${student.firstName}&lastName=${student.lastName}`);
    }
});

module.exports = loginRoute;
