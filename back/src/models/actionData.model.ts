// actionData.model.ts

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
          type: DataTypes.ARRAY(DataTypes.INTEGER),
          allowNull: true,
        },
        actionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        Title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isActivated: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
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
