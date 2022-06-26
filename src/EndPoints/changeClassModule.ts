import { Request, Response } from "express";
import ClassDataBase from "../Data/ClassDataBase";


export default async function changeClassModule(req:Request, res:Response) {
   const {id , modulo} = req.body
   const statusCode = 200
    try {
        const turmaDB = new ClassDataBase()
        await turmaDB.change(id, modulo)
        res.status(statusCode).send("Mudança concluida com sucesso!")
    } catch (error:any) {
        console.log(error.sqlMessage)
        res.status(400).send("Erro de atualização!")
        
    }
    
} 