const topik = require('../../koreanforestweb/src/assets/topik.json')
const Sequelize = require('sequelize');
require('dotenv').config()
let ssl;

if (process.env.STATUS === 'production') {
  ssl = {
    require: true,
    rejectUnauthorized: false,
  }
} else {
  ssl = null
}

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost',
  logging: false,
  dialect: 'postgres',
  dialectOptions: {
    ssl,
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const SaveData = sequelize.define('saveData', {
  userId: {
    type: Sequelize.STRING,
    unique: true,
  },
  save1: {
    type: Sequelize.JSON,
    defaultValue: topik,
  }
})

const UserData = sequelize.define('userData', {
  userId: {
    type: Sequelize.STRING,
    unique: true,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  }
},
{
  freezeTableName: true,
});

async function updateOrCreate(model, where, newItem) {
  const foundItem = await model.findOne({ where });
  if (!foundItem) {
    const item = await model.create(newItem)
    return { item, created: true };
  }
  const item = await model.update(newItem, { where });
  return { item, created: false };
};

module.exports = {
  sequelize,
  UserData,
  SaveData,
  updateOrCreate
}