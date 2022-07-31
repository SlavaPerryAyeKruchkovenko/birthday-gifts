const { Model, DataTypes} = require('sequelize')
const database = require('../database')
class Gift extends Model{}

Gift.init({
    user_id:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    gift_name:{
        type:DataTypes.STRING,
        allowNull: false,
    }
},{
    database,
    modelName: 'GIFTS'
})

module.exports = Gift