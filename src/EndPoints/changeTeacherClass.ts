import { Request, Response } from "express"
import TeacherDatabase from "../Data/TeachersDatabase"




export default async function changeTeacherClass(req: Request, res: Response): Promise<void> {
    const statusCode = 201
    let errorCode: number = 400

    const { id, turma_id } = req.body
    try {

        if (!id || !turma_id) {
            errorCode = 422
            throw new Error('Verifique se todos os campos estão preenchidos')
        }
    

        const classDB = new TeacherDatabase()

    await classDB.changeClass(id, turma_id)
    res.status(statusCode).send("Turma alterada com sucesso")

} catch (error: any) {
    res.status(errorCode).send({ message: error.message })
    res.status(400).send({ message: error.message || error.sqlMessage })
}

}