import { Sequelize, DataTypes } from "sequelize";
import { databaseConfig } from "../config/db.config";
import { User } from "./user.model";
import { Service } from "./service.model";
import { Action } from "./action.model";
import { Reaction } from "./reaction.model";
import { ActionData } from "./actionData.model";
import { ReactionData } from "./reactionData.model";

const sequelize = new Sequelize(databaseConfig.DB!, databaseConfig.USER!, databaseConfig.PASSWORD, {
  host: databaseConfig.HOST,
  dialect: databaseConfig.dialect,
  operatorsAliases: false as any, 
  pool: {
      max: databaseConfig.pool.max,
      min: databaseConfig.pool.min, 
      acquire: databaseConfig.pool.acquire, 
      idle: databaseConfig.pool.idle
  },
  port: 3306 
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err: Error) => {
        console.error("Unable to connect to the database:", err);
    });

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables

db.users = User.initialize(sequelize);
db.services = Service.initialize(sequelize);
db.actions = Action.initialize(sequelize);
db.reactions = Reaction.initialize(sequelize);
db.actionData = ActionData.initialize(sequelize);
db.reactionData = ReactionData.initialize(sequelize);



sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");

export default db;
