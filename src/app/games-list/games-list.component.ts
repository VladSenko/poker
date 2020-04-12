import { Component, OnInit } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Game } from '../models/game.model';

@Component({
    selector: 'app-games-list',
    templateUrl: './games-list.component.html',
    styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit {
    public games: Game[];

    constructor(private afs: AngularFirestore) {
        this.afs
            .collection('games')
            .valueChanges()
            .subscribe((games: Game[]) => {
                this.games = games;
            });
    }

    ngOnInit(): void {}
}
