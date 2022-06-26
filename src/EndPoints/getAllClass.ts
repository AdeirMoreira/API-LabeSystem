import { Request, Response } from "express";
import ClassDataBase from "../Data/ClassDataBase";


export default async function getAllClass(req:Request, res:Response):Promise<void> {
    const statusCode = 200
    try {
        const classDB = new ClassDataBase()
        res.status(statusCode).send(await classDB.getAll())
    } catch (error:any) {
        res.status(404).send("Turmas Não encontradas!"|| error.sqlMessage )
       
    }   
}