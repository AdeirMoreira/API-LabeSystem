import { Request, Response } from "express";
import Docente_EspecialidadeDataBase from "../Data/Teacher_SpecialityDataBase";
import SpecialtyDataBase from "../Data/SpecialtyDataBase";
import TeacherDatabase from "../Data/TeachersDatabase";
import { Docentes } from "../Model/Docentes";
import TeacherData from "../Identifiers/TeacherData";



export default async function createTeacher(req: Request, res: Response) {
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
        const teacherSpecialityDB = new Docente_EspecialidadeDataBase()
        const teacher = new Docentes(IDs.TeacherId(), nome, email, revetedData_Nasc, IDs.Speciality())
        const Promises = [teacherDB.create(teacher), specialityDB.create(IDs.Speciality()), teacherSpecialityDB.create(IDs.Teacher_Speciality())]
        await Promise.all(Promises)
        res.status(statusCode).send('Professor criado com sucesso!')
    } catch (error: any) {
        res.status(statusCode).send({ message: error.message })
    }

}