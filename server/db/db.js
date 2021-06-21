const Sequelize = require("sequelize");

// const db = new Sequelize(process.env.DATABASE_URL || "postgres://localhost:5432/messenger", {
//   logging: false
// });
console.log(process.env.DB_NAME);
const db = new Sequelize(
  "messenger",
  "postgres",
  "password",
  {
    host: "localhost",
    dialect: 'postgres',
    port: "5432",
  }

)
module.exports = db;
