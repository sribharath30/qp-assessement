import { Transaction } from 'sequelize';
import { User } from '../models';

export interface IUser {
    createUser(user: Partial<User>, transaction: Transaction): Promise<number | undefined>;
    getUser(email: string): Promise<User | null>;
}

export class UserRepository implements IUser {
    createUser = async (
        user: Partial<User>,
        transaction: Transaction
    ): Promise<number | undefined> => {
        const { user_id } = await User.create(user, { transaction: transaction });
        return user_id;
    };

    getUser = async (email: string): Promise<User | null> => {
        const user = await User.findOne({ where: { email: email } });
        return user;
    };
}
