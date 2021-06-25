import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"


interface IAuthenticateRequest {
    email: string,
    password: string
}

class AuthenticateUserService {

    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)

        const user = await usersRepositories.findOne({
            email
        })

        if (!user) {
            throw new Error('Email/Password incorect')
        }

        const passwordMath = await compare(password, user.password)

        if (!passwordMath) {    
            throw new Error('Email/Password incorect')
        }

        const token = sign({
            email: user.email
        }, "4badaee57fed5610012a296273158f5f", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token
    }
}

export { AuthenticateUserService }