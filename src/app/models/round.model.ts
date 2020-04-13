export class Round {
    name: string;
    maxCards: number;
    dealer: number;
    topSuite: any;

    constructor(name: string, maxCards: number) {
        this.name = name;
        this.maxCards = maxCards;
    }
}
