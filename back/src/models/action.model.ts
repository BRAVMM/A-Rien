// action.model.ts

import { Sequelize, DataTypes, Model } from 'sequelize';

class Action extends Model {
  public id!: number;
  public name!: string;
  public args!: string;
  public reactionsIds!: number;

  public static initialize(sequelize: Sequelize) {
    Action.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        args: {
          type: DataTypes.JSON,
          allowNull: true,
        
        },
        reactionsIds: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'actions',
      }
    );
  }
}

export { Action };
