import idGenerator from "./GeradorID";
import { Hobbys, Usuario } from "./Types";

export class Estudantes extends Usuario implements Hobbys{
    hobbys:  string[] = []
    constructor(
        id:string,nome:string,email:string,data_nasc:string,turma_id:string, hobbys: string[]
    ){
        super(id,nome,email,data_nasc,turma_id)
        this.hobbys = hobbys
    }

    public getId = () => this.id
    public getNome = () => this.nome
    public getEmail = () => this.email
    public getData_nasc = () => this.data_nasc
    public getTurma_id = () => this.turma_id
    public getHobbys = () => this.hobbys
}

