// reaction.model.ts

import { Sequelize, DataTypes, Model } from 'sequelize';

class Reaction extends Model {
  public id!: number;
  public name!: string;
  public args!: string;
  public actionIds!: number;

  public static initialize(sequelize: Sequelize) {
    Reaction.init(
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
        actionIds: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'reactions',
      }
    );
  }
}

export { Reaction };
