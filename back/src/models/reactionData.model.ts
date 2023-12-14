// reactionData.model.ts

import { Sequelize, DataTypes, Model } from 'sequelize';

class ReactionData extends Model {
    public id!: number;
    public owner_id!: number;
    public data!: JSON;
    public actionsDataIds!: number[];

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
          type: DataTypes.ARRAY(DataTypes.INTEGER),
          allowNull: true,
        },
        oauthId : {
          type: DataTypes.INTEGER,
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
