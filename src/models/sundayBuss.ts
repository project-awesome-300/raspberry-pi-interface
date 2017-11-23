export class SundayBuss {
    Origin: string;
    Name: string;
    FirstBus:string;
    SecondBus: string;
    ThirdBus: string;
    FourthBus:string;
    FifthBus:string;
    SixthBus:string;
    SeventhBus:string;
    Last: string

    constructor(origin: string, name: string, firstbus:string,sbus: string,tbus:string, fbus:string,
        fifthbus: string, sixthbus:string, sevenbus:string, last:string) {
        this.Origin = origin;
        this.Name = name;
        this.FirstBus=firstbus;
        this.SecondBus = sbus;
        this.ThirdBus = tbus;
        this.FourthBus = fbus;
        this.FifthBus = fifthbus;
        this.SixthBus= sixthbus;
        this.SeventhBus=sevenbus;
        this.Last=last;
    }
}

