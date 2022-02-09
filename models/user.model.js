module.exports = (sequelize,Sequelize) =>{
    const User = sequelize.define('User',{
        user : Sequelize.STRING(50),
        password : Sequelize.STRING(200)
    });

    return User;
}