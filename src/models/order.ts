import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

class Order extends Model {
    public order_id!: number;
    public user_id!: number;
    public total_price?: number;
    public status!: string;
    public order_date!: Date;
    public created_at!: Date;
    public updated_at!: Date;
}

Order.init(
    {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'user_id',
            },
        },
        total_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'pending',
        },
        order_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize,
        modelName: 'Order',
        tableName: 'Orders',
        timestamps: false,
    }
);

export default Order;
