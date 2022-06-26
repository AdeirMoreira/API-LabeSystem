import { Request, Response } from "express";
import ClassDataBase from "../Data/ClassDataBase";
import ClassData from "../Identifiers/ClassData";
import { Turmas } from "../Model/Turmas";

export default class ClassSchool {
    async getAll(req:Request, res:Response):Promise<void> {
        const statusCode = 200
        try {
            const classDB = new ClassDataBase()
            res.status(statusCode).send(await classDB.getAll())
        } catch (error:any) {
            res.status(404).send("Turmas Não encontradas!"|| error.sqlMessage )
        }   
    }

    async create(req: Request, res: Response) {
        let statusCode = 201
        const { nome, modulo } = req.body
        try {
            if (!nome || !modulo) {
                statusCode = 422
                throw new Error('Verifique se todos os campos estão preenchidos')
            }
            const IDs = new ClassData()
            const turmaDB = new ClassDataBase()
            const  schoolClass = new Turmas(IDs.ClassID(), nome, modulo)
            await turmaDB.create(schoolClass)
            res.status(statusCode).send("Turma criada com sucesso!")
        } catch (error: any) {
            res.status(statusCode).send({ error: error.message })
        }
    }

    async changeModule(req:Request, res:Response) {
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

    async getActive(req:Request, res:Response):Promise<void> {
        let statusCode = 200
        const modulo = Number(req.query.modulo) || 0 
        try {
            if (!modulo) {
                statusCode = 422
                throw new Error('Informe o numero do modulo')
            }
            const getActiveTurmaDB = new ClassDataBase()
            res.status(statusCode).send(await getActiveTurmaDB.getActive(modulo))
        } catch (error:any) {
            res.status(statusCode).send({ message: error.message })
        }
        
    }

    async getData(req:Request, res:Response) {
        let statusCode = 200
        const id = req.params.turma_id as string
        try {
            if(!id){
                statusCode = 422
                throw new Error("Informe o id da turma!");
            }
            const TurmaIdDB = new ClassDataBase()
            const result = await TurmaIdDB.getData(id) 
            res.status(200).send(result)
            
        } catch (error:any) {
            res.status(statusCode).send({message:error.message})
            res.status(400).send({error: error.message || error.sqlMessage})
        }
    }
}