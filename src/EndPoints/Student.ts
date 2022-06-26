import { Request, Response } from "express"
import HobbyDataBase from "../Data/HobbyDataBase"
import StudentDatabase from "../Data/StudentsDatabase"
import Estudante_HobbyDataBase from "../Data/Student_HobbyDataBase"
import StudentData from "../Identifiers/StudentData"
import { Estudantes } from "../Model/Estudante"

export default class Student {
    async  getAll(req: Request, res: Response): Promise<void> {
        const statusCode = 200
        try {
            const studentsDB = new StudentDatabase()
            res.status(statusCode).send(await studentsDB.getAll())
        } catch (error: any) {
            res.status(400).send({ message: error.message || error.sqlMessage })
        }
    }

    async create(req:Request,res:Response) {
        let statusCode = 201
        const {nome,email,data_nasc,hobbys} = req.body
        const revetedData_Nasc:string = data_nasc.split('/').reverse().join('-')
        try {   
            if (!nome || !email ||!data_nasc||!hobbys) {
                statusCode = 422
                throw new Error('Verifique se todos os campos estão preenchidos')
            }
            const IDs = new StudentData(hobbys)
            const studentDB = new StudentDatabase()
            const hobbyDB = new HobbyDataBase()
            const estudante_hobbyDB = new Estudante_HobbyDataBase()
            const student = new Estudantes(IDs.StudentId(),nome,email,revetedData_Nasc,IDs.hobbys())
            const Promises = [studentDB.create(student),hobbyDB.create(IDs.hobbys()),estudante_hobbyDB.create(IDs.estudante_hobbys())]
            await Promise.all(Promises)
            res.status(statusCode).send('Estudante criado!')
        } catch (error:any) {
            res.status(statusCode).send({ message: error.message })
        }
    }

    async search(req:Request,res:Response) {
        let statusCode = 200
        const term = req.query.term as string
        try {
            if (!term) {
                statusCode = 422
                throw new Error('Verifique se todos os campos estão preenchidos')
            }
            const studentDB = new StudentDatabase()
            res.status(statusCode).send(await studentDB.search(term))
        } catch (error:any) {
            res.status(statusCode).send({error:error.message})
        }
    }

    async ChangeClass(req:Request,res:Response):Promise<void> {
        const statusCode = 200
        const {id , turma_id} = req.body
        try {
            const studentDB = new StudentDatabase()
            await studentDB.changeClass(id,turma_id)
            res.status(statusCode).send('mudança concluída')
        } catch (error:any) {
            res.status(404).send({ error: error.message })
        }
    }
}