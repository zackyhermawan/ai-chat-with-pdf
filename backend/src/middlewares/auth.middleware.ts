import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                email: string
            }
        }
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json({
            error: "Unauthorized"
        })
    }

    try {
        const cleanToken = authHeader.split(" ")[1]

        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET as string) as {
            id: string
            email: string
        }

        req.user = decoded
        return next()
    } catch (err) {
        return res.status(401).json({ error: "Invalid Token" })
    }
}