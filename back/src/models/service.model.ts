// service.model.ts

import {Sequelize, DataTypes, Model} from 'sequelize';

class Service extends Model {

    public id!: number;
    public name!: string;
    public actionsId!: number[];
    public reactionsId!: number[];

    public static initialize(sequelize: Sequelize) {
        Service.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                },
                name: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false,
                },
                actionsIds: {
                    type: DataTypes.ARRAY(DataTypes.INTEGER),
                    allowNull: true,
                },
                reactionsIds: {
                    type: DataTypes.ARRAY(DataTypes.INTEGER),
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'services',
            }
        );
    }
}

export {Service};
