class Type {
    static STRING = new Type("STRING");
    static NUMBER = new Type("NUMBER");
    static BOOLEAN = new Type("BOOLEAN");
    static UNDEFINED = new Type("UNDEFINED");

    private readonly type: string;

    constructor(type: string) {
        this.type = type;
    }

    static typeOf(data: any){
        switch (typeof data) {
            case "number":
                return this.NUMBER;
            case "string":
                return this.STRING;
            case "boolean":
                return this.BOOLEAN
            default:
                return this.UNDEFINED
        }
    }

    toString() {
        return this.type;
    }
}

export default Type;
