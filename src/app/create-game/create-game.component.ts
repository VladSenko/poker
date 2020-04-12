import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Game } from '../models/game.model';

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

    constructor(
        private modalService: NgbModal,
        private afs: AngularFirestore
    ) {
        this.gamesCollection = afs.collection<Game>('games');
    }

    ngOnInit(): void {}

    public openCreateGameDialog(content: any): void {
        this.modalService.open(content, { centered: true });
    }

    public createGame(): void {
        this.gamesCollection.add({
            id: this.afs.createId(),
            playersCount: this.playersCount,
            maxCards: this.maxCards,
            cardsStack: this.cardsStack,
        });

        this.modalService.dismissAll();
    }
}
