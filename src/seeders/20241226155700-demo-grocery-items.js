module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Grocery_Items', [
            {
                name: 'Apple',
                description: 'Fresh red apples',
                price: 1.99,
                category: 'Fruit',
                created_at: new Date(),
                quantity: 0,
                updated_at: new Date(),
            },
            {
                name: 'Banana',
                description: 'Organic bananas',
                price: 0.99,
                category: 'Fruit',
                quantity: 20,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Carrot',
                description: 'Fresh carrots',
                price: 0.79,
                category: 'Vegetable',
                quantity: 40,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Grocery_Items', {});
    },
};
