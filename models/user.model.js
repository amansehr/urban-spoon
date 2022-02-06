module.exports = (sequelize,Sequelize) =>{
    const User = sequelize.define('User',{
        name : Sequelize.STRING(50),
        age : Sequelize.INTEGER
    });

    return User;
}