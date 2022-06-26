import { Request, Response } from "express";
import TurmaDataBase from "../Data/ClassDataBase";


export default async function getClassData(req:Request, res:Response) {
    let errorCode = 400
    const id = req.params.turma_id as string
    
    try {
        if(!id){
            errorCode = 422
            throw new Error("Informe o id da turma!");
        }
        const TurmaIdDB = new TurmaDataBase()
        const result = await TurmaIdDB.getData(id) 
        res.status(200).send(result)
        
    } catch (error:any) {
        res.status(errorCode).send({message:error.message})
        res.status(400).send({error: error.message || error.sqlMessage})
        
    }
    
}