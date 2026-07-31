import { Request, Response } from "express";
import { loginUser, Me, registerUser } from "../services/auth.service.js";

export const register = async(req: Request, res: Response) => {
    try {

        const {name, email, password} = req.body

        const user = await registerUser(name, email, password)

        return res.status(201).json({
            message: "Register successfully",
            data: user
        })
    } catch(error: any) {
        console.log(error)

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const login = async(req: Request, res: Response) => {
    try {
        const {email, password} = req.body

        const user = await loginUser(email, password)

        return res.json(user)
    } catch (error: any) {

        console.log(error)

        return res.status(401).json({
            message: error.message
        })

    }
}

export const getMe = async(req: Request, res: Response) => {
    try {
        const user = await Me(req.user?.id as string)

        return res.json(user)
    } catch (error: any) {

        return res.status(401).json({
            error: error.message
        })

    }
}