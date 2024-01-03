// actionData.model.ts

import {Sequelize, DataTypes, Model} from 'sequelize';

class ActionData extends Model {
    public id!: number;
    public ownerId!: number;
    public data!: string;
    public reactionsDataIds!: number[];
    public actionId!: number;
    public title!: string;
    public isActivated!: boolean;
    public oauthId!: number;

    public static initialize(sequelize: Sequelize) {
        ActionData.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                ownerId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                data: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
                reactionsDataIds: {
                    type: DataTypes.ARRAY(DataTypes.INTEGER),
                    allowNull: true,
                },
                actionId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isActivated: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                oauthId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'actionsData',
            }
        );
    }
}

export {ActionData};
