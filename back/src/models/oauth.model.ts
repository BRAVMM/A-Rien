// oauth.model.ts

import {Sequelize, DataTypes, Model} from 'sequelize';

class OAuth extends Model {
    public id!: number;
    public serviceId!: number;
    public encryptedOAuthToken!: string;
    public iv!: string;
    public ownerID!: number;

    public static initialize(sequelize: Sequelize) {
        OAuth.init(
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
                encryptedOAuthToken: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                iv: {
                    type: DataTypes.STRING,
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
