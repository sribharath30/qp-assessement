import app from './app';
import sequelize from './config/database';

const PORT = process.env.PORT;


const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    process.on('SIGINT', async () => {
      console.log('Closing database connection...');
      await sequelize.close();
      console.log('Database connection closed. Exiting...');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
