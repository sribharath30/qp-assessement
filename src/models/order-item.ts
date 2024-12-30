import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Order from './order';
import GroceryItem from './grocery-items';

class OrderItem extends Model {
    public order_item_id!: number;
    public order_id!: number;
    public item_id!: number;
    public quantity!: number;
    public price!: number;
    public created_at!: Date;
    public updated_at!: Date;
}

OrderItem.init(
    {
        order_item_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Order,
                key: 'order_id',
            },
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: GroceryItem,
                key: 'item_id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
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
        modelName: 'OrderItem',
        tableName: 'Order_Items',
        timestamps: false,
    }
);

export default OrderItem;
