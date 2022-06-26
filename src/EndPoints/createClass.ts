import { Request, Response } from "express";
import TurmaDataBase from "../Data/ClassDataBase";
import ClassData from "../Identifiers/ClassData";
import { Turmas } from "../Model/Turmas";

export default async function CreateClass(req: Request, res: Response) {
    let statusCode = 201
    const { nome, modulo } = req.body
    try {
        if (!nome || !modulo) {
            statusCode = 422
            throw new Error('Verifique se todos os campos estão preenchidos')
        }
        const IDs = new ClassData()
        const turmaDB = new TurmaDataBase()
        const  schoolClass = new Turmas(IDs.ClassID(), nome, modulo)
        await turmaDB.create(schoolClass)
        res.status(statusCode).send("Turma criada com sucesso!")
    } catch (error: any) {
        res.status(statusCode).send({ error: error.message })

    }

}