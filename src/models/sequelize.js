import { Sequelize } from 'sequelize';

// db, username, password, { config }
const sequelize = new Sequelize('postgres', 'postgres', 'shortn', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
