import { Estudante_Hobby } from "../Model/Types";
import BaseDataBase from "./BaseDataBase";

export default class Estudante_HobbyDataBase extends BaseDataBase{
    public getAll = async ():Promise<Estudante_Hobby[]> => {
        try {
            return await BaseDataBase.connection('estudante_hobby').select('*')
        } catch (error:any) {
            console.log({data:{message:error.sqlMessage}})
            throw new Error('Erro no banco de dados')
        }
    }

    public create = async (Hobbys:Estudante_Hobby[]):Promise<void> => {
        try {
            await BaseDataBase.connection('estudante_hobby').insert(Hobbys)
        } catch (error:any) {
            console.log({data:{message:error.sqlMessage}})
            throw new Error('Erro no banco de dados')
        }
    }

    public getById = async (id: string):Promise<Estudante_Hobby[]> => {
        try {
            return await BaseDataBase.connection('estudante_hobby').select('*').where({id})
        } catch (error:any) {
            console.log({data:{message:error.sqlMessage}})
            throw new Error('Erro no banco de dados')
        }
    }
}