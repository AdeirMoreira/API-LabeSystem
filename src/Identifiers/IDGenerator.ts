import { ID } from "../Model/Types"

export class IDGenerator implements ID {
    constructor(protected IdLength:number){}
    
    public ID = () => {
        const CHARACTERS = "QWERTYUIOPASDFGHJKLÇZXCVBNMqwertyuiopasdfghjklçzxcvbnm0123456789"
        let id:string = ""
        for(let i = 0; i <= this.IdLength; i++) {
            const index = Math.floor(Math.random() * (CHARACTERS.length - 1))
            id += CHARACTERS[index]
        }
        return id
    }
}
