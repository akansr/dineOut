export default function(sequelize, DataTypes) {
    let userslogin = sequelize.define('userlogins', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    } );

    return userslogin;
};

