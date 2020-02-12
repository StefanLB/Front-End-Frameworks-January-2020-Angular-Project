export interface Bid {
    id: string;
    name: string;
    description: string;
    createdOn: Date;
    endsOn: Date;
    highestBid: number;
    imageUrl: string;
    seller: string;
}