import { Estudante_Hobby, hobby } from "../Model/Types";
import { IDGenerator } from "./IDGenerator";

export default class Student_HobbyIDs extends IDGenerator {
    constructor(private Hobbys: hobby[], private id :string){
        super(15)
    }

    public IDs = ():Estudante_Hobby[] => {
        return this.Hobbys.map(hobby => { 
            return {id:this.ID(), estudante_id:this.id, hobby_id:hobby.id}
        })
    }
}