import { IDGenerator } from "./IDGenerator"


export default class Class extends IDGenerator {
    constructor() {
        super(15)
    }
    private Id = this.ID()

    public ClassID = ():string => this.Id
}