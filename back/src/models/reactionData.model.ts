// action.model.ts

import { Sequelize, DataTypes, Model } from 'sequelize';

class ReactionData extends Model {

  public static initialize(sequelize: Sequelize) {
    ReactionData.init(
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
        actionsDataIds: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'reactionData',
      }
    );
  }
}

export { ReactionData };
