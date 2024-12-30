import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../services/auth-service';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    signUp = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, password, phone, address, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            await this.authService.createUser({
                name,
                email,
                password: hashedPassword,
                phone: phone || '',
                address: address || '',
                role,
            });
            res.status(200).send({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error signing up user:', error);
            res.status(500).send({
                message: 'An error occurred while signing up user.',
            });
        }
    };

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const user = await this.authService.getUser(email);
            if (!user) {
                res.status(401).json({ message: 'Invalid username or password' });
                return;
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Invalid username or password' });
            }

            const token = jwt.sign(
                { email: user.email, role: user.role },
                process.env.JWT_SECRET || '',
                {
                    expiresIn: '1h',
                }
            );
            res.json({ token });
            res.status(200).send();
        } catch (error) {
            console.error('Error signing up user:', error);
            res.status(500).send({
                message: 'An error occurred while signing up user.',
            });
        }
    };
}
