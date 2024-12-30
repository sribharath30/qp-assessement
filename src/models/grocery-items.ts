import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class GroceryItem extends Model {
    public item_id!: number;
    public name!: string;
    public description?: string;
    public price!: number;
    public category?: string;
    public quantity!: number;
    public created_at!: Date;
    public updated_at!: Date;
}

GroceryItem.init(
    {
        item_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
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
        modelName: 'GroceryItem',
        tableName: 'Grocery_Items',
        timestamps: false,
    }
);

export default GroceryItem;
