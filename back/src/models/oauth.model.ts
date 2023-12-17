// oauth.model.ts

import {Sequelize, DataTypes, Model} from 'sequelize';

class OAuth extends Model {
    public id!: number;
    public serviceId!: number;
    public encryptedAccessToken!: string;
    public encryptedRefreshToken!: string;
    public ivAccess!: string;
    public ivRefresh!: string;
    public expiresIn!: number;
    public ownerID!: number;

    public static initialize(sequelize: Sequelize) {
        OAuth.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                serviceId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                encryptedAccessToken: {
                    type: DataTypes.STRING(1024),
                    allowNull: false,
                },
                encryptedRefreshToken: {
                    type: DataTypes.STRING(1024),
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
                ownerID: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'oauth',
            }
        );
    }
}

export {OAuth};
