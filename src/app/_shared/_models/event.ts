export interface Event {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    location: string;
    ticketPrice: number;
    pricePool: number;
    dateStart: Date;
    dateEnd: Date;
}
