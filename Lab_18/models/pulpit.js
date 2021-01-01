var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var config = require("../config");
var Faculty = require("./faculty");

var sequelize = new Sequelize(config);

class Pulpit extends Model{};
Pulpit.init(
{
    pulpit: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
    pulpit_name: {type: Sequelize.STRING, allowNull: false},
    faculty: {type: Sequelize.STRING, allowNull: false,
        references: {model: Faculty, key: "Faculty"}}
}, {
    sequelize: sequelize,
    modelName: "Pulpit",
    tableName: "Pulpit",
    timestamps: false
    }
)

module.exports = {
    selectPulpit(req, res) {
        sequelize.authenticate()
            .then(() => {
                Pulpit.findAll().then(pulpits => {
                res.end(JSON.stringify(pulpits));
            })
        });
    },
    insertPulpit(req, res, _pulpit, _pulpit_name, _faculty) {
        sequelize.authenticate()
            .then(() => {
                Pulpit.create({pulpit: _pulpit, pulpit_name: _pulpit_name, faculty: _faculty}).then(pulpit => {
                res.end(JSON.stringify({pulpit: _pulpit, pulpit_name: _pulpit_name, faculty: _faculty}));
            })
            .catch((err) => {
                res.end(JSON.stringify({error: 'No such pulpit with provided id was found'}));
            })
        });
    },
    updatePulpit(req, res, _pulpit, _pulpit_name, _faculty) {
        sequelize.authenticate()
            .then(() => {
                Pulpit.update({pulpit_name: _pulpit_name, faculty: _faculty}, {where: {pulpit: _pulpit}}).then(pulpit => {
                res.end(JSON.stringify({pulpit: _pulpit, pulpit_name: _pulpit_name, faculty: _faculty}));
            })
            .catch((err) => {
               res.end(JSON.stringify({error: 'No such pulpit with provided id was found'}));
            })
        });
    },
    deletePulpit(req, res, _pulpit) {
        sequelize.authenticate()
            .then(() => {
                Pulpit.destroy({where: {pulpit: _pulpit}}).then(pulpit => {
                res.end(JSON.stringify({pulpit: _pulpit}));
            })
                .catch((err) => {
                res.end(JSON.stringify({error: 'No such pulpit with provided id was found'}));
            })
        });
    }
}