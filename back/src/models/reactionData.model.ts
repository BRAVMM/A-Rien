// reactionData.model.ts

import {Sequelize, DataTypes, Model} from 'sequelize';

class ReactionData extends Model {
    public id!: number;
    public ownerId!: number;
    public data!: JSON;
    public reactionId!: number;
    public oauthId!: number;

    public static initialize(sequelize: Sequelize) {
        ReactionData.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
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
                reactionId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                oauthId: {
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

export {ReactionData};
