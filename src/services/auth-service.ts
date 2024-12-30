import sequelize from '../config/database';
import { User } from '../models';
import { OrderRepository } from '../respository/order-repository';
import { UserRepository } from '../respository/user-repository';

export class AuthService {
    private userRepository: UserRepository;
    private orderRepository: OrderRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.orderRepository = new OrderRepository();
    }

    createUser = async (payload: Partial<User>): Promise<number | undefined> => {
        const transaction = await sequelize.transaction();
        try {
            const userId = await this.userRepository.createUser(payload, transaction);
            await this.orderRepository.createOrder(
                { user_id: userId, total_price: 0 },
                transaction
            );
            await transaction.commit();
            return userId;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };

    getUser = async (email: string): Promise<User | null> => {
        try {
            const user = await this.userRepository.getUser(email);
            return user;
        } catch (error) {
            throw error;
        }
    };
}
