import { hobby} from "../Model/Types";
import BaseDataBase from "./BaseDataBase";

export default class HobbyDataBase extends BaseDataBase {
    public getAll = async ():Promise<hobby[]> => {
        try {
            return await BaseDataBase.connection('hobby').select('*')
        } catch (error:any) {
            console.log({data:{message:error.sqlMessage}})
            throw new Error('Erro no banco de dados')
        }
    }

    public create = async (hobby:hobby[]):Promise<void> => {
        try {
            await BaseDataBase.connection('hobby').insert(hobby)
        } catch (error:any) {
            console.log({data:{message:error.sqlMessage}})
            throw new Error('Erro no banco de dados')
        }
    }

    public getById = async (id: string):Promise<hobby[]> => {
        try {
            return await BaseDataBase.connection('hobby').select('*').where({id})
        } catch (error:any) {
            console.log({data:{message:error.sqlMessage}})
            throw new Error('Erro no banco de dados')
        }
    }
}