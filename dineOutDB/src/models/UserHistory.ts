export default function(sequelize, DataTypes) {
    let users = sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
           type: DataTypes.STRING
        },
        placeId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        like: {
            type: DataTypes.BOOLEAN
        },
        dislike: {
            type: DataTypes.BOOLEAN
        }
    } );

    return users;
};


