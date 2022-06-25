import { Turmas } from "../Model/Turmas";
import { Turma } from "../Model/Types";
import BaseDataBase from "./BaseDataBase";

export default class TurmaDataBase extends BaseDataBase {
    public getAllTurmas = async ():Promise<Turma[]> =>{
        try {
            return await BaseDataBase.connection("turma").select("*")

        } catch (error:any) {
            throw new Error('Erro no banco de dados')
        }
    }
    public getActive = async (modulo:number):Promise<Turma[] | undefined> =>{
        try {
            return await BaseDataBase.connection("turma").where("modulo",">",modulo)
        } catch (error) {
            throw new Error('Erro no banco de dados')
        }
    }

    public createTurma = async (turma:Turmas):Promise<void> =>{
        try {
        await BaseDataBase.connection("turma")
            .insert({
            id:turma.getId(),
            nome:turma.getNome(),
            modulo:turma.getModulo()
        })
        } catch (error:any) {
            console.log({data:{message:error.sqlMessage}})
            throw new Error('Erro no banco de dados')
        } 
    }

    public changeTurma = async (id:string, modulo:number) =>{
        console.log(id, modulo)
        try {
            await BaseDataBase.connection("turma")
            .where({
                id:id,
            })
            .update({
                modulo:modulo
            })
        } catch (error:any) {
            throw new Error("Erro na atualização!")
            
        }
    }

    public getDataTurma = async (id:string) =>{
        
        try {
            return await BaseDataBase.connection('turma') 
            .select('turma.nome as turma','estudante.nome as estudante', 'estudante.id as estudanteID', 
            'docente.nome as professor', 'docente.id as docenteID')         
            .join('estudante','estudante.turma_id','=','turma.id')
            .join('docente','docente.turma_id','=','turma.id')
            .where("turma.id",id)   
        } catch (error:any) {
            console.log({data:{message:error.sqlMessage}})
            throw new Error("Erro no banco de dados!");
            
            
        }
    }


}