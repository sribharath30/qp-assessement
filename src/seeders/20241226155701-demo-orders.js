module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Orders', [
            {
                user_id: 1,
                total_price: 15.99,
                status: 'completed',
            },
            {
                user_id: 2,
                total_price: 9.99,
                status: 'pending',
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Orders', {});
    },
};
