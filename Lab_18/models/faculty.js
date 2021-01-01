var Sequelize = require("sequelize");
var Model = Sequelize.Model;
var config = require("../config");

var sequelize = new Sequelize(config);

class Faculty extends Model{};
Faculty.init(
{
    faculty: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
    faculty_name: {type: Sequelize.STRING, allowNull: false}
}, {
    sequelize: sequelize,
    modelName: "Faculty",
    tableName: "Faculty",
    timestamps: false
    }
)

module.exports = {
    selectFaculty(req, res) {
        sequelize.authenticate()
            .then(() => {
                Faculty.findAll().then(faculties => {
                res.end(JSON.stringify(faculties));
            })
        });
    },
    insertFaculty(req, res, _faculty, _faculty_name) {
        sequelize.authenticate()
            .then(() => {
                Faculty.create({faculty: _faculty, faculty_name: _faculty_name}).then(faculty => {
                res.end(JSON.stringify({faculty: _faculty, faculty_name: _faculty_name}));
            })
            .catch((err) => {
                res.end(JSON.stringify({error: 'No such faculty with provided id was found'}));
            })
        });
    },
    updateFaculty(req, res, _faculty, _faculty_name) {
        sequelize.authenticate()
            .then(() => {
                Faculty.update({faculty_name: _faculty_name}, {where: {faculty: _faculty}}).then(faculty => {
                res.end(JSON.stringify({faculty: _faculty, faculty_name: _faculty_name}));
            })
            .catch((err) => {
               res.end(JSON.stringify({error: 'No such faculty with provided id was found'}));
            })
        });
    },
    deleteFaculty(req, res, _faculty) {
        sequelize.authenticate()
            .then(() => {
                Faculty.destroy({where: {faculty: _faculty}}).then(faculty => {
                res.end(JSON.stringify({faculty: _faculty}));
            })
                .catch((err) => {
                res.end(JSON.stringify({error: 'No such faculty with provided id was found'}));
            })
        });
    }
}