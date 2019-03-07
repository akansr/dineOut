module.exports = function(sequelize, DataTypes) {
    let restaurants = sequelize.define('restaurants', {
    placeId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    dislikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
    } );

    return restaurants;
};

