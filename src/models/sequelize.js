import { Sequelize } from 'sequelize';

// db, username, password, { config }
const sequelize = new Sequelize('postgres', 'postgres', 'shortn', {
  host: 'localhost',
  dialect: 'postgres',
});

if (process.env.NODE_ENV === 'development') {
  (async () => {
    await sequelize.sync({ force: true });
  })();
}

export default sequelize;
