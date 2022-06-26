import { Estudante_Hobby, hobby } from "../Model/Types";
import { IDGenerator } from "./IDGenerator";
import HobbysIDs from "./Hobby";
import Student_HobbyIDs from "./Student_Hobby";

export default class StudentData extends IDGenerator {
    constructor (private hobbysStrings:string[]) {
        super(15)
        const hobbysWithId = new HobbysIDs(this.hobbysStrings)
        const hobbysWithIdValue = hobbysWithId.IDs()
        const estudante_hobbyWithID = new Student_HobbyIDs(hobbysWithIdValue,this.Id)
        const estudante_hobbyWithIDValue = estudante_hobbyWithID.IDs()
        this.hobbysWithId = hobbysWithIdValue
        this.estudante_hobbyWithID = estudante_hobbyWithIDValue
    }
    private Id:string = this.ID()
    private hobbysWithId:hobby[] = []
    private estudante_hobbyWithID:Estudante_Hobby[] = []

    public StudentId = () => {
        return this.Id
    }

    public hobbys = () => {
        return this.hobbysWithId
    }

    public estudante_hobbys = () => {
        return this.estudante_hobbyWithID
    }
    
}