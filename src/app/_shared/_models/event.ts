export interface Event {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    location: string;
    category: string;
    ticketPrice: number;
    pricePool: number;
    dateStart: {
        seconds: number,
        nanoseconds: number;
    };
    dateEnd: {
        seconds: number,
        nanoseconds: number;
    };
}

