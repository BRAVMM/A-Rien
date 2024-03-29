// user.model.ts

import {Sequelize, DataTypes, Model} from 'sequelize';

class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public encryptedEmail!: string;
    public ivEmail!: string;
    public isOauthLogged!: boolean;

    public static initialize(sequelize: Sequelize) {
        User.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                username: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false,
                },
                encryptedEmail: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false,
                },
                ivEmail: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isOauthLogged: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: 'users',
            }
        );
    }

    public static async createOne(userData: { username: string; email: string, password: string }) {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error: any) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }
}

export {User};
