export interface Event {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    location: string;
    category: string;
    ticketPrice: number;
    pricePool: number;
    dateStart: string;
    dateEnd: string;
    createdBy: string;
}