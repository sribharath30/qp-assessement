import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as {
            email: string;
            role: string;
        };

        if (decoded.email && decoded.role) {
            (req as any).user = { email: decoded.email, role: decoded.role };
            next();
        } else {
            res.status(403).json({ message: 'Invalid token payload' });
        }
    } catch (err) {
        res.status(403).json({ message: 'Forbidden' });
    }
};
