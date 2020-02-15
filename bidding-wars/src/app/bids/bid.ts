export interface Bid {
    id?: string;
    name?: string;
    description?: string;
    createdOn?: Date;
    endsOn?: Date;
    imageUrl?: string;
    seller?: string;
    sellerEmail?: string;
    highestBid?: number;
    highestBidder?: string;
    highestBidderEmail?: string;
}