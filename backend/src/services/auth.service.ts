import { prisma } from "../lib/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async(name: string, email: string, password: string) => {
    const existsUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(existsUser) {
        throw new Error("Email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return {
        id: user.id,
        name: user.name,
        email: user.email
    }
}

export const loginUser = async(email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(!user) {
        throw new Error("Invalid email or password")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw new Error("Incorrect email or password")
    }

    const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email
    }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']
    })

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}

export const Me = async(userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    })

    return user
}