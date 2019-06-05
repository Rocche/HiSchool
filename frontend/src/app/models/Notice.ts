export class Notice{

    public target: string;
    public title: string;
    public body: string;

    constructor(target: string, title: string, body: string){
        this.target = target;
        this.title = title;
        this.body = body;
    }
}