import { Especialidade } from "../Model/Types";
import { IDGenerator } from "./IDGenerator";

export default class SpecialityIDs extends IDGenerator {
    constructor (private Specialitys:string[]) {
        super(15)
    }

    public Ids = ():Especialidade[] => {
        return this.Specialitys.map(speciality => {
            return {id:this.ID(), nome:speciality}
        })
    }
}