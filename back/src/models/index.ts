import { Sequelize, DataTypes } from "sequelize";
import { databaseConfig } from "../config/db.config";
import { User } from "./user.model";
import { Service } from "./service.model";
import { Action } from "./action.model";
import { Reaction } from "./reaction.model";
import { ActionData } from "./actionData.model";
import { ReactionData } from "./reactionData.model";

const sequelize = new Sequelize(`${databaseConfig.dialect}://${databaseConfig.USER}:${databaseConfig.PASSWORD}@${databaseConfig.HOST}:${databaseConfig.PORT}/${databaseConfig.DB}`);

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

export default db;