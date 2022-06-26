import { Docente_Especialidade, Estudante_Hobby } from "../Model/Types";
import BaseDataBase from "./BaseDataBase";

export default class Docente_EspecialidadeDataBase extends BaseDataBase {
    public getAll = async ():Promise<Docente_Especialidade[]> => {
        try {
            return await BaseDataBase.connection('docente_especialidade').select('*')
        } catch (error:any) {
            console.log({data:{message:error.sqlMessage}})
            throw new Error('Erro no banco de dados')
        }
    }

    public create = async (Docente_Especialidade:Docente_Especialidade[]):Promise<void> => {
        try {
            await BaseDataBase.connection('docente_especialidade').insert(Docente_Especialidade)
        } catch (error:any) {
            console.log({data:{message:error.sqlMessage}})
            throw new Error('Erro no banco de dados')
        }
        
    }

    public getById = async (id: string):Promise<Estudante_Hobby[]> => {
        try {
            return await BaseDataBase.connection('docente_especialidade').select('*').where({id})
        } catch (error:any) {
            console.log({data:{message:error.sqlMessage}})
            throw new Error('Erro no banco de dados')
        }
    }
}