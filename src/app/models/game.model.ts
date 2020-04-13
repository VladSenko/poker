import { Round } from './round.model';

export interface Game {
    id: string;
    playersMaxCount: number;
    players: any[];
    maxCards: number;
    cardsStack: number;
    rounds: Round[];
}
