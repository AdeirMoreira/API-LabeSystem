import { Request, Response } from "express";
import TurmaDataBase from "../Data/ClassDataBase";


export default async function getActiveClass(req:Request, res:Response):Promise<void> {
    const statusCode = 200
    let errorCode: number = 400

    const modulo = Number(req.query.modulo) || 0 
    try {

        if (!modulo) {
            errorCode = 422
            throw new Error('Informe o numero do modulo')
        }
        const getActiveTurmaDB = new TurmaDataBase()
        res.status(statusCode).send(await getActiveTurmaDB.getActive(modulo))
    } catch (error:any) {
        res.status(400).send("Não existe turmas ativas nesse modulo!")
        res.status(errorCode).send({ message: error.message })
        res.status(400).send({ message: error.message || error.sqlMessage })
        
    }
    
}