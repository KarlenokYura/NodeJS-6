var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var config = require("../config");
var Pulpit = require("./pulpit");

var sequelize = new Sequelize(config);

class Subject extends Model{};
Subject.init(
{
    subject: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
    subject_name: {type: Sequelize.STRING, allowNull: false},
    pulpit: {type: Sequelize.STRING, allowNull: false,
        references: {model: Pulpit, key: "Pulpit"}}
}, {
    sequelize: sequelize,
    modelName: "Subject",
    tableName: "Subject",
    timestamps: false
    }
)

module.exports = {
    selectSubject(req, res) {
        sequelize.authenticate()
            .then(() => {
                Subject.findAll().then(subjects => {
                res.end(JSON.stringify(subjects));
            })
        });
    },
    insertSubject(req, res, _subject, _subject_name, _pulpit) {
        sequelize.authenticate()
            .then(() => {
                Subject.create({subject: _subject, subject_name: _subject_name, pulpit: _pulpit}).then(subject => {
                res.end(JSON.stringify({subject: _subject, subject_name: _subject_name, pulpit: _pulpit}));
            })
            .catch((err) => {
                res.end(JSON.stringify({error: 'No such subject with provided id was found'}));
            })
        });
    },
    updateSubject(req, res, _subject, _subject_name, _pulpit) {
        sequelize.authenticate()
            .then(() => {
                Subject.update({subject_name: _subject_name, pulpit: _pulpit}, {where: {subject: _subject_name}}).then(subject => {
                res.end(JSON.stringify({subject: _subject, subject_name: _subject_name, pulpit: _pulpit}));
            })
            .catch((err) => {
               res.end(JSON.stringify({error: 'No such subject with provided id was found'}));
            })
        });
    },
    deleteSubject(req, res, _subject) {
        sequelize.authenticate()
            .then(() => {
                Subject.destroy({where: {subject: _subject}}).then(subject => {
                res.end(JSON.stringify({subject: _subject}));
            })
                .catch((err) => {
                res.end(JSON.stringify({error: 'No such subject with provided id was found'}));
            })
        });
    }
}