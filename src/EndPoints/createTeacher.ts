import { Request, Response } from "express";
import Docente_EspecialidadeDataBase from "../Data/Docente_especialidadeDataBase";
import SpecialtyDataBase from "../Data/SpecialtyDataBase";
import TeacherDatabase from "../Data/TeachersDatabase";
import { Docentes } from "../Model/Docentes";
import idGenerator from "../Model/GeradorID";
import { Docente_Especialidade, Especialidade } from "../Model/Types";



export default async function createTeacher(req: Request, res: Response) {
    const statusCode = 201
    let errorCode: number = 400
    const id: string = idGenerator(15)
    const { nome, email, data_nasc, especialidades } = req.body
    const revetedData_Nasc = data_nasc.split('/').reverse().join('-')
    const especialidadeId:Especialidade[] = especialidades.map((especialidade: string) => {
        return { id: idGenerator(15), nome: especialidade }
    })
    const Docente_EspecialidadeID:Docente_Especialidade[] = especialidadeId.map((especialidade:Especialidade) => {
        return {id:idGenerator(15), docente_id:id, especialidade_id:especialidade.id}
    })
    try {

        if (!nome || !email ||!data_nasc||!especialidades) {
            errorCode = 422
            throw new Error('Verifique se todos os campos estão preenchidos')
        }

        const teacherDB = new TeacherDatabase()
        const specialityDB = new SpecialtyDataBase()
        const teacherSpecialityDB = new Docente_EspecialidadeDataBase()
        const teacher = new Docentes(id, nome, email, revetedData_Nasc, especialidadeId)
        const Promises = [teacherDB.create(teacher), specialityDB.create(especialidadeId), teacherSpecialityDB.create(Docente_EspecialidadeID)]
        await Promise.all(Promises)

        res.status(statusCode).send('Professor criado com sucesso!')

    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
        res.status(400).send({ message: error.message || error.sqlMessage })
    }

}