import { Request, Response } from "express";
import TeacherDatabase from "../Data/TeachersDatabase";
import SpecialtyDataBase from '../Data/SpecialtyDataBase'
import Teacher_SpecialityDataBase from '../Data/Teacher_SpecialityDataBase'
import TeacherData from '../Identifiers/TeacherData'
import { Docentes } from "../Model/Docentes";

export default class TeacherSchool {
    async getAllTeachers (req:Request,res:Response):Promise<void>  {
        const statusCode = 200
        try {
            const teachersDB = new TeacherDatabase() 
            res.status(statusCode).send(await teachersDB.getAll())
        } catch (error:any) {
            
            res.status(400).send({ message: error.message || error.sqlMessage })
        }
    }

    async createTeacher(req: Request, res: Response) {
        let statusCode = 201
        const { nome, email, data_nasc, especialidades } = req.body
        const revetedData_Nasc = data_nasc.split('/').reverse().join('-')
        try {
    
            if (!nome || !email ||!data_nasc||!especialidades) {
                statusCode = 422
                throw new Error('Verifique se todos os campos estão preenchidos')
            }
            const IDs = new TeacherData(especialidades)
            const teacherDB = new TeacherDatabase()
            const specialityDB = new SpecialtyDataBase()
            const teacherSpecialityDB = new Teacher_SpecialityDataBase()
            const teacher = new Docentes(IDs.TeacherId(), nome, email, revetedData_Nasc, IDs.Speciality())
            const Promises = [teacherDB.create(teacher), specialityDB.create(IDs.Speciality()), teacherSpecialityDB.create(IDs.Teacher_Speciality())]
            await Promise.all(Promises)
            res.status(statusCode).send('Professor criado com sucesso!')
        } catch (error: any) {
            res.status(statusCode).send({ message: error.message })
        }
    }

    async changeTeacherClass(req: Request, res: Response): Promise<void> {
        let statusCode: number = 200
        const { id, turma_id } = req.body
        try {
            if (!id || !turma_id) {
                statusCode = 422
                throw new Error('Verifique se todos os campos estão preenchidos')
            }
            const classDB = new TeacherDatabase()
            await classDB.changeClass(id, turma_id)
            res.status(statusCode).send("Turma alterada com sucesso")
        } catch (error: any) {
            res.status(statusCode).send({ message: error.message })
        }
    
    }
}