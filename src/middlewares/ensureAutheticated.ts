import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string
}

export function ensureAutheticated(request: Request, response: Response, next: NextFunction) {
    // Receber Token
    const authToken = request.headers.authorization

    // Validar se token esta preenchido 
    if(!authToken) {
        return response.status(401).end()
    }

    //validar se token é valido
    const [, token] = authToken.split(' ')

    try {
        const { sub } = verify( token, '4badaee57fed5610012a296273158f5f') as IPayload

        request.user_id = sub

        return next()
    } catch (error) {
        return response.status(401).end()
    }


    return response.status(401).json({
        error: 'Unauthorized'
    })
}