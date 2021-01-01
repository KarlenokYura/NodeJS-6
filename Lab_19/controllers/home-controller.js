const express = require('express');
const homeRoute = express.Router();
const Students = require('./../models');

homeRoute.get('/', (request, response) => {
    const {firstName, lastName} = request.query;
    const student = Students.getStudentByFirstName(firstName);
    if (!student || student.lastName !== lastName) {
        response.redirect('/login');
    } else {
        response.sendFile('home.html', {root: './views'});
    }
});

homeRoute.get('/student/:name', (request, response) => {
    const student = Students.getStudentByFirstName(request.params.name);
    if (student) {
        response.json(student);
    } else {
        response.status(400).end();
    }
});

homeRoute.post('/student/:name/:surname', (request, response) => {
    const firstName = request.params.name;
    const lastName = request.params.surname;
    const student = Students.createStudent({firstName, lastName});
    if (student) {
        response.json(student);
    } else {
        response.status(400).end();
    }
});

homeRoute.put('/student/:id/:name/:surname', (request, response) => {
    const id = request.params.id;
    const firstName = request.params.name;
    const lastName = request.params.surname;

    const student = Students.updateStudent({id, firstName, lastName});
    if (student) {
        response.json(student);
    } else {
        response.status(400).end();
    }
});

homeRoute.delete('/student/:id', (request, response) => {
    const id = request.params.id;

    const student = Students.deleteStudent(id);
    if (student) {
        response.json(student);
    } else {
        response.status(400).end();
    }
});

module.exports = homeRoute;
