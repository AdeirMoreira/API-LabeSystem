import { Request, Response } from "express";
import Estudante_HobbyDataBase from "../Data/Student_HobbyDataBase";
import HobbyDataBase from "../Data/HobbyDataBase";
import StudentDatabase from "../Data/StudentsDatabase";
import { Estudantes } from "../Model/Estudante";
import idGenerator from "../Model/GeradorID";
import { Estudante_Hobby, hobby } from "../Model/Types";


export default async function createStudent(req:Request,res:Response) {
    const statusCode = 201
    let errorCode: number = 400
    const id = idGenerator(15)
    const {nome,email,data_nasc,hobbys} = req.body
    const revetedData_Nasc:string = data_nasc.split('/').reverse().join('-')
    const hobbysWithId:hobby[] = hobbys.map((hobby:string) => {
        return {id:idGenerator(15),nome:hobby}
    })
    const estudante_hobbyWithID:Estudante_Hobby[] = hobbysWithId.map((hobby:hobby) => {
        return {id: idGenerator(15), estudante_id:id, hobby_id:hobby.id}
    })
    try {

        if (!nome || !email ||!data_nasc||!hobbys) {
            errorCode = 422
            throw new Error('Verifique se todos os campos estão preenchidos')
        }

        const studentDB = new StudentDatabase()
        const hobbyDB = new HobbyDataBase()
        const estudante_hobbyDB = new Estudante_HobbyDataBase()
        const student = new Estudantes(id,nome,email,revetedData_Nasc,hobbysWithId)
        const Promises = [studentDB.create(student),hobbyDB.create(hobbysWithId),estudante_hobbyDB.create(estudante_hobbyWithID)]
        await Promise.all(Promises)
        res.status(statusCode).send('Estudante criado!')
    } catch (error:any) {
        res.status(errorCode).send({ message: error.message })
    }
}