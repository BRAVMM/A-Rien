// action.model.ts

import { Sequelize, DataTypes, Model } from 'sequelize';

class ActionData extends Model {

  public static initialize(sequelize: Sequelize) {
    ActionData.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        owner_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        data: {
          type: DataTypes.JSON,
          allowNull: true,
        
        },
        reactionsDataIds: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'actionsData',
      }
    );
  }
}

export { ActionData };