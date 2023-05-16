const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Traveller extends Model { };

Traveller.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            len: [2, 30]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        },
    },
},
    {
        hooks: {
            async beforeCreate(newTravellerData) {
                newTravellerData.password = await bcrypt.hash(newTravellerData.password, 10);
                return newTravellerData;
            },
            async beforeUpdate(updatedTravellerData) {
                updatedTravellerData.password = await bcrypt.hash(updatedTravellerData.password, 10);
                return updatedTravellerData;
            },
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'traveller',
    }
)


module.exports = Traveller;