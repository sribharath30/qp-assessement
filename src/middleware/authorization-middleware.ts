import { Request, Response, NextFunction } from 'express';

export const authorize = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!allowedRoles.includes((req as any).user.role)) {
            res.status(403).json({ message: 'Access Denied' });
        } else {
            next();
        }
    };
};
