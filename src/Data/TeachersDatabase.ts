import { Docentes } from "../Model/Docentes";
import { Teacher } from "../Model/Types";
import BaseDataBase from "./BaseDataBase";



export default class TeacherDatabase extends BaseDataBase {
    public getAll = async (): Promise<Teacher[]> => {
        try {
            const result = await BaseDataBase.connection("docente").select("*")
            return result.map((teacher:Teacher) => {
                const revetedData = new Date(teacher.data_nasc).toISOString().slice(0, 10).split("-").reverse().join("/")
                return {...teacher, data_nasc: revetedData}
            })
        } catch (error: any) {
            console.log({ data: { message: error.sqlMessage } })
            throw new Error('Erro no banco de dados')
        }
    }
    public create = async (teacher: Docentes): Promise<void> => {
        try {
            await BaseDataBase.connection("docente")
                .insert({
                    id: teacher.getId(),
                    nome: teacher.getNome(),
                    email: teacher.getEmail(),
                    data_nasc: teacher.getData_nasc(),
                    turma_id: teacher.getTurma_id()
        })
        } catch (error: any) {
            console.log({ data: { message: error.sqlMessage } })
            throw new Error('Erro no banco de dados')
        }
    }
    public changeClass = async (id: string, turma: string) => {
        try {
            return await BaseDataBase.connection("docente")
                .update({
                    turma_id: turma
                }).where({
                    id
                })
        } catch (error: any) {
            console.log({ data: { message: error.sqlMessage } })
            throw new Error('Erro no banco de dados')
        }
    }
}    