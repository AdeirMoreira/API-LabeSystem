import { Especialidade } from "../Model/Types";
import BaseDataBase from "./BaseDataBase";

export default class SpecialtyDataBase extends BaseDataBase {
    public getAll = async ():Promise<Especialidade[]> => {
        try {
            return await BaseDataBase.connection('especialidade').select('*')
        } catch (error:any) {
            console.log({data:{message:error.sqlMessage}})
            throw new Error('Erro no banco de dados')
        }
    }

    public create = async (speciality:Especialidade[]):Promise<void> => {
        try {
            await BaseDataBase.connection('especialidade').insert(speciality)
        } catch (error:any) {
            console.log({data:{message:error.sqlMessage}})
            throw new Error('Erro no banco de dados')
        }
    }

    public getById = async (id: string):Promise<Especialidade[]> => {
        try {
            return await BaseDataBase.connection('especialidade').select('*').where({id})
        } catch (error:any) {
            console.log({data:{message:error.sqlMessage}})
            throw new Error('Erro no banco de dados')
        }
    }
}