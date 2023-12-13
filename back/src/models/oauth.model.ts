// oauth.model.ts

import { Sequelize, DataTypes, Model } from 'sequelize';

class Oauth extends Model {
  
  public id!: number;
  public serviceId!: number;
  public oauthtToken!: string;
  public ownerID!: number;

  public static initialize(sequelize: Sequelize) {
    Oauth.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        serviceId: {
          type: DataTypes.INTEGER,
          unique: true,
          allowNull: false,
        },
        oauthtToken: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ownerID: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'oauth',
      }
    );
  }
}

export { Oauth };
