import { Especialidade, Docente_Especialidade } from "../Model/Types"
import { IDGenerator } from "./IDGenerator"



export default class Teacher_SpecialityIDs extends IDGenerator {
    constructor(private Specialitys: Especialidade[], private id :string){
        super(15)
    }

    public IDs = ():Docente_Especialidade[] => {
        return this.Specialitys.map(speciality => { 
            return {id:this.ID(), docente_id:this.id, especialidade_id:speciality.id}
        })
    }
}