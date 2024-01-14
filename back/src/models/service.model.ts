// service.model.ts

import {Sequelize, DataTypes, Model} from 'sequelize';

class Service extends Model {
    public id!: number;
    public serviceId!: number;
    public name!: string;
    public actionsIds!: number[];
    public reactionsIds!: number[];

    public static initialize(sequelize: Sequelize) {
        Service.init(
            {
                _id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                id: {
                    type: DataTypes.INTEGER,
                    unique: false,
                    allowNull: false,
                },
                serviceId: {
                    type: DataTypes.INTEGER,
                    unique: true,
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
