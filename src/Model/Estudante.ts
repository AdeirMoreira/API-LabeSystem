import idGenerator from "../Identifiers/IDGenerator";
import { hobby, Hobbys, Usuario } from "./Types";

export class Estudantes extends Usuario implements Hobbys{
    hobbys:  hobby[] = []
    constructor(
        id:string,nome:string,email:string,data_nasc:string, hobbys: hobby[]
    ){
        super(id,nome,email,data_nasc)
        this.hobbys = hobbys
    }

    public getId = () => this.id
    public getNome = () => this.nome
    public getEmail = () => this.email
    public getData_nasc = () => this.data_nasc
    public getTurma_id = () => this.turma_id
    public getHobbys = () => this.hobbys
}

