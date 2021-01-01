var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var config = require("../config");
var Pulpit = require("./pulpit");

var sequelize = new Sequelize(config);

class Teacher extends Model{};
Teacher.init(
{
    teacher: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
    teacher_name: {type: Sequelize.STRING, allowNull: false},
    pulpit: {type: Sequelize.STRING, allowNull: false,
        references: {model: Pulpit, key: "Pulpit"}}
}, {
    sequelize: sequelize,
    modelName: "Teacher",
    tableName: "Teacher",
    timestamps: false
    }
)

module.exports = {
    selectTeacher(req, res) {
        sequelize.authenticate()
            .then(() => {
                Teacher.findAll().then(teachers => {
                res.end(JSON.stringify(teachers));
            })
        });
    },
    insertTeacher(req, res, _teacher, _teacher_name, _pulpit) {
        sequelize.authenticate()
            .then(() => {
                Teacher.create({teacher: _teacher, teacher_name: _teacher_name, pulpit: _pulpit}).then(teacher => {
                res.end(JSON.stringify({teacher: _teacher, teacher_name: _teacher_name, pulpit: _pulpit}));
            })
            .catch((err) => {
                res.end(JSON.stringify({error: 'No such teacher with provided id was found'}));
            })
        });
    },
    updateTeacher(req, res, _teacher, _teacher_name, _pulpit) {
        sequelize.authenticate()
            .then(() => {
                Teacher.update({teacher_name: _teacher_name, pulpit: _pulpit}, {where: {teacher: _teacher}}).then(teacher => {
                res.end(JSON.stringify({teacher: _teacher, teacher_name: _teacher_name, pulpit: _pulpit}));
            })
            .catch((err) => {
               res.end(JSON.stringify({error: 'No such teacher with provided id was found'}));
            })
        });
    },
    deleteTeacher(req, res, _teacher) {
        sequelize.authenticate()
            .then(() => {
                Teacher.destroy({where: {teacher: _teacher}}).then(teacher => {
                res.end(JSON.stringify({teacher: _teacher}));
            })
                .catch((err) => {
                res.end(JSON.stringify({error: 'No such teacher with provided id was found'}));
            })
        });
    }
}