export class Buss {
    Origin: string;
    Name: string;
    FirstBus:string;
    SecondBus: string;
    ThirdBus: string;
    FourthBus:string;
    FifthBus:string;
 //   Blank:string;
    SixthBus:string;
    SeventhBus:string;
    Blankk:string;
    ThirdLast:string;
    SecLast:string;
    Last: string

    constructor(origin: string, name: string, firstbus:string,sbus: string,tbus:string, fbus:string,/*blank:string,*/
        fifthbus: string, sixthbus:string, sevenbus:string, blankk:string, thirdlast:string, seclast:string, last:string) {
        this.Origin = origin;
        this.Name = name;
        this.FirstBus=firstbus;
        this.SecondBus = sbus;
        this.ThirdBus = tbus;
        this.FourthBus = fbus;
        this.FifthBus = fifthbus;
      //  this.Blank=blank;
        this.SixthBus= sixthbus;
        this.SeventhBus=sevenbus;
        this.Blankk=blankk;
        this.ThirdLast=thirdlast;
        this.SecLast  = seclast;
        this.Last=last;
    }
}

