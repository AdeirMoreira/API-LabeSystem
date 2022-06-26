import { Request, Response } from "express";
import Estudante_HobbyDataBase from "../Data/Student_HobbyDataBase";
import HobbyDataBase from "../Data/HobbyDataBase";
import StudentDatabase from "../Data/StudentsDatabase";
import { Estudantes } from "../Model/Estudante";
import StudentData from "../Identifiers/StudentData";


export default async function createStudent(req:Request,res:Response) {
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