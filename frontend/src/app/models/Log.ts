export class Log{
    private sender: string;
    private body: string;

    constructor(sender: string, body: string){
        this.sender = sender;
        this.body = body;
    }
}