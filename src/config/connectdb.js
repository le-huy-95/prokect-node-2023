import Sequelize from "sequelize"

const sequelize = new Sequelize('app web', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});


// connection để test xem db đã kết nối được chưa
const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


export default connection
