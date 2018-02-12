export class Forecast {
    constructor(
        public cityName: string,
        public maxTemp: string,
        public minTemp: string,
        public date: string,
        public icon: string,
        public desc: string,
        public wind: string,
        public clouds: string      
    ) { }
}

