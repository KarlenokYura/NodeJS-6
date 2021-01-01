
const Students = [
    {
        id: 1,
        firstName: 'Yura',
        lastName: 'Karlenok'
    },
    {
        id: 2,
        firstName: 'Liza',
        lastName: 'Borodina'
    },
    {
        id: 3,
        firstName: 'Ilya',
        lastName: 'Sikorskiy'
    }
];

module.exports = {
    getStudentByFirstName: (firstName) => {
        return Students.find(student => student.firstName === firstName);
    },

    createStudent: ({firstName, lastName}) => {
        const id = Students.length + 1;
        const newStudent = {id, firstName, lastName};
        Students.push(newStudent);
        return newStudent;
    },

    updateStudent: ({id, firstName, lastName}) => {
        for (var i = Students.length - 1; i >= 0; --i) {
            if (Students[i].id == id) {                        
                Students[i].firstName = firstName;
                Students[i].lastName = lastName;
                return {
                    id: id,
                    firstName: firstName,
                    lastName: lastName
                };
            }
        }
    }, 

    deleteStudent: (id) => {
        for (var i = Students.length - 1; i >= 0; --i) {
            if (Students[i].id == id) {
                Students.splice(i, 1);
                return {
                    id: id
                };
            }
        }
    }
};
