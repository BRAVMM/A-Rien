// oauth.model.ts

import {Sequelize, DataTypes, Model} from 'sequelize';

class OAuth extends Model {

    public id!: number;
    public serviceId!: number;
    public oauthToken!: string;
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
                oauthToken: {
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

export {OAuth};
