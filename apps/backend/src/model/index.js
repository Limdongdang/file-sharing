import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('exampledb', 'exampleuser', 'examplepass', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
});

export { sequelize };