// oauth.model.ts

import {Sequelize, DataTypes, Model} from 'sequelize';

class OAuth extends Model {
    public id!: number;
    public serviceId!: number;
    public encryptedAccessToken!: string;
    public encryptedRefreshToken!: string;
    public ivAccess!: string;
    public ivRefresh!: string;
    public OAuthEmail!: string;
    public expiresIn!: number;
    public ownerId!: number;
    public datas!: JSON;
    public createdAt!: Date;
    public updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        OAuth.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                OAuthEmail: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    unique: false,
                },
                serviceId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                encryptedAccessToken: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                encryptedRefreshToken: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                ivAccess: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                ivRefresh: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                expiresIn: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                ownerId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                datas: {
                    type: DataTypes.JSON,
                    allowNull: true,
                }
            },
            {
                sequelize,
                tableName: 'oauth',
            }
        );
    }
}

export {OAuth};
