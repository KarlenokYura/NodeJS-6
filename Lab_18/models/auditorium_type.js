var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var config = require("../config");

var sequelize = new Sequelize(config);

class Auditorium_Type extends Model{};
Auditorium_Type.init(
{
    auditorium_type: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
    auditorium_typename: {type: Sequelize.STRING, allowNull: false}
}, {
    sequelize: sequelize,
    modelName: "Auditorium_Type",
    tableName: "Auditorium_Type",
    timestamps: false
    }
)

module.exports = {
    selectAuditoriumType(req, res) {
        sequelize.authenticate()
            .then(() => {
                Auditorium_Type.findAll().then(auditorium_types => {
                res.end(JSON.stringify(auditorium_types));
            })
        });
    },
    insertAuditoriumType(req, res, _auditorium_type, _auditorium_typename) {
        sequelize.authenticate()
            .then(() => {
                Auditorium_Type.create({auditorium_type: _auditorium_type, auditorium_typename: _auditorium_typename}).then(auditorium_type => {
                res.end(JSON.stringify({auditorium_type: _auditorium_type, auditorium_typename: _auditorium_typename}));
            })
            .catch((err) => {
                res.end(JSON.stringify({error: 'No such auditorium type with provided id was found'}));
            })
        });
    },
    updateAuditoriumType(req, res, _auditorium_type, _auditorium_typename) {
        sequelize.authenticate()
            .then(() => {
                Auditorium_Type.update({auditorium_typename: _auditorium_typename}, {where: {auditorium_type: _auditorium_type}}).then(auditorium_type => {
                res.end(JSON.stringify({auditorium_type: _auditorium_type, auditorium_typename: _auditorium_typename}));
            })
            .catch((err) => {
               res.end(JSON.stringify({error: 'No such auditorium type with provided id was found'}));
            })
        });
    },
    deleteAuditoriumType(req, res, _auditorium_type) {
        sequelize.authenticate()
            .then(() => {
                Auditorium_Type.destroy({where: {auditorium_type: _auditorium_type}}).then(auditorium_type => {
                res.end(JSON.stringify({auditorium_type: _auditorium_type}));
            })
                .catch((err) => {
                res.end(JSON.stringify({error: 'No such auditorium type with provided id was found'}));
            })
        });
    }
}