import { hobby } from "../Model/Types";
import { IDGenerator } from "./IDGenerator";


export default class HobbysIDs extends IDGenerator{
    constructor(private Hobbys:string[]){
        super(15)
    }

    public IDs = ():hobby[] => {
        return this.Hobbys.map(hobby => {
            return {id: this.ID(), nome: hobby}
        })
    }
}