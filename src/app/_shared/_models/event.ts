export class Event {
    toLowerCase: any;
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public imageUrl: string,
        public location: string,
        public category: string,
        public ticketPrice: number,
        public pricePool: number,
        public dateStart: Date,
        public dateEnd: Date
    ) { }
}
