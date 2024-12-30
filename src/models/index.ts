import User from './user';
import GroceryItem from './grocery-items';
import Order from './order';
import OrderItem from './order-item';

Order.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Order, { foreignKey: 'user_id' });

OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });

OrderItem.belongsTo(GroceryItem, { foreignKey: 'item_id' });
GroceryItem.hasMany(OrderItem, { foreignKey: 'item_id' });


export { User, GroceryItem, Order, OrderItem };
