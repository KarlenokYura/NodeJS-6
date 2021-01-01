var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var config = require("../config");
var Auditorium_Type = require("./auditorium_type");

var sequelize = new Sequelize(config);

class Auditorium extends Model{};
Auditorium.init(
{
    auditorium: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
    auditorium_name: {type: Sequelize.STRING, allowNull: false},
    auditorium_capacity: {type: Sequelize.INTEGER, allowNull: false},
    auditorium_type: {type: Sequelize.STRING, allowNull: false,
        references: {model: Auditorium_Type, key: "Auditorium_Type"}}
}, {
    sequelize: sequelize,
    modelName: "Auditorium",
    tableName: "Auditorium",
    timestamps: false
    }
)

module.exports = {
    selectAuditorium(req, res) {
        sequelize.authenticate()
            .then(() => {
                Auditorium.findAll().then(auditoriums => {
                res.end(JSON.stringify(auditoriums));
            })
        });
    },
    insertAuditorium(req, res, _auditorium, _auditorium_name, _auditorium_capacity, _auditorium_type) {
        sequelize.authenticate()
            .then(() => {
                Auditorium.create({auditorium: _auditorium, auditorium_name: _auditorium_name, auditorium_capacity: _auditorium_capacity, auditorium_type: _auditorium_type}).then(auditorium => {
                res.end(JSON.stringify({auditorium: _auditorium, auditorium_name: _auditorium_name, auditorium_capacity: _auditorium_capacity, auditorium_type: _auditorium_type}));
            })
            .catch((err) => {
                res.end(JSON.stringify({error: 'No such auditorium with provided id was found'}));
            })
        });
    },
    updateAuditorium(req, res, _auditorium, _auditorium_name, _auditorium_capacity, _auditorium_type) {
        sequelize.authenticate()
            .then(() => {
                Auditorium.update({auditorium_name: _auditorium_name, auditorium_capacity: _auditorium_capacity, auditorium_type: _auditorium_type}, {where: {auditorium: _auditorium}}).then(auditorium => {
                res.end(JSON.stringify({auditorium: _auditorium, auditorium_name: _auditorium_name, auditorium_capacity: _auditorium_capacity, auditorium_type: _auditorium_type}));
            })
            .catch((err) => {
               res.end(JSON.stringify({error: 'No such auditorium with provided id was found'}));
            })
        });
    },
    deleteAuditorium(req, res, _auditorium) {
        sequelize.authenticate()
            .then(() => {
                Auditorium.destroy({where: {auditorium: _auditorium}}).then(auditorium => {
                res.end(JSON.stringify({auditorium: _auditorium}));
            })
                .catch((err) => {
                res.end(JSON.stringify({error: 'No such auditorium with provided id was found'}));
            })
        });
    }
}