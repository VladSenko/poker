import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Game } from '../models/game.model';
import { Round } from '../models/round.model';

@Component({
    selector: 'app-create-game',
    templateUrl: './create-game.component.html',
    styleUrls: ['./create-game.component.scss'],
})
export class CreateGameComponent implements OnInit {
    public playersCount = 3;
    public maxCards = 10;
    public cardsStack = 36;

    private gamesCollection: AngularFirestoreCollection<Game>;

    constructor(private modalService: NgbModal, private afs: AngularFirestore) {
        this.gamesCollection = afs.collection<Game>('games');
    }

    ngOnInit(): void {}

    public openCreateGameDialog(content: any): void {
        this.modalService.open(content, { centered: true });
    }

    public createGame(): void {
        this.gamesCollection.add({
            id: this.afs.createId(),
            playersMaxCount: this.playersCount,
            players: [],
            maxCards: this.maxCards,
            cardsStack: this.cardsStack,
            rounds: this.generateRounds(this.playersCount, this.maxCards),
        });

        this.modalService.dismissAll();
    }

    private generateRounds(playersCount: number, maxCards: number): Round[] {
        const roundsCollection: Round[] = [];
        const inverseRounds: Round[] = [];
        for (let i = 0; i < maxCards - 1; i++) {
            roundsCollection.push(new Round((i + 1).toString(), i + 1));
            inverseRounds.push(new Round((i + 1).toString(), i + 1));
        }
        for (let i = 0; i < playersCount; i++) {
            roundsCollection.push(new Round(maxCards.toString(), maxCards));
        }
        roundsCollection.push(...inverseRounds.reverse());

        for (let i = 0; i < playersCount; i++) {
            roundsCollection.push(new Round('Тьомна', maxCards));
        }
        for (let i = 0; i < playersCount; i++) {
            roundsCollection.push(new Round('Безкозирка', maxCards));
        }
        for (let i = 0; i < playersCount; i++) {
            roundsCollection.push(new Round('Мізєр', maxCards));
        }
        for (let i = 0; i < playersCount; i++) {
            roundsCollection.push(new Round('Золота', maxCards));
        }
        return roundsCollection.map((round) => {
            return { ...round };
        });
    }
}
