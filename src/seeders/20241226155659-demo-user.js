module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                user_id: '1',
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'hashedpassword1',
                phone: '123-456-7890',
                address: '123 Main St, Springfield, IL',
                role: 'admin'
            },
            {
                user_id: '2',
                name: 'Jane Smith',
                email: 'janesmith@example.com',
                password: 'hashedpassword2',
                phone: '987-654-3210',
                address: '456 Elm St, Springfield, IL',
                role: 'user'
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', {});
    },
};
