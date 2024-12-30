module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Order_Items', [
            {
                order_id: 1,
                item_id: 1,
                quantity: 3,
                price: 1.99,
            },
            {
                order_id: 1,
                item_id: 2,
                quantity: 2,
                price: 0.99,
            },
            {
                order_id: 2,
                item_id: 3,
                quantity: 5,
                price: 0.79,
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Order_Items', {});
    },
};
