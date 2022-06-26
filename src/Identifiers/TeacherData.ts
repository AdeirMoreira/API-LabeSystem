import { Docente_Especialidade, Especialidade } from "../Model/Types";
import { IDGenerator } from "./IDGenerator";
import SpecialityIDs from "./Speciality";
import Teacher_SpecialityIDs from "./TeacherSpeciality";

export default class TeacherData extends IDGenerator {
    constructor( private SpecialityStings:string[]){
        super(15)
        const SpecialityWithID = new SpecialityIDs(this.SpecialityStings)
        const SpecialityWithIDValue = SpecialityWithID.Ids()
        const Teacher_SpecialityWithID = new Teacher_SpecialityIDs(SpecialityWithIDValue,this.Id)
        const Teacher_SpecialityWithIDValue = Teacher_SpecialityWithID.IDs()
        this.SpecialityWithID = SpecialityWithIDValue
        this.Teacher_SpecialityWithId = Teacher_SpecialityWithIDValue

    }

    private Id:string = this.ID()
    private SpecialityWithID:Especialidade[] = []
    private Teacher_SpecialityWithId:Docente_Especialidade[] = []

    public TeacherId = () => {
        return this.Id
    }

    public Speciality = () => {
        return this.SpecialityWithID
    }

    public Teacher_Speciality = () => {
        return this.Teacher_SpecialityWithId
    }
}