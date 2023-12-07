// user.model.ts

import { Sequelize, DataTypes, Model } from 'sequelize';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;

  public static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        },
      {
        sequelize,
        tableName: 'users',
      }
    );
  }
}

export { User };
