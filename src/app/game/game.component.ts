import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../models/game.model';
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Player } from '../models/player.model';
import * as _ from 'lodash';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
    private gameId: string;
    public game: Game;
    private gamesCollection: AngularFirestoreCollection<Game>;
    private registeredInGame = false;

    constructor(private route: ActivatedRoute, private afs: AngularFirestore) {
        this.route.paramMap.subscribe(
            (params: ParamMap) => (this.gameId = params.get('id'))
        );
        this.gamesCollection = afs.collection<Game>('games');
    }

    ngOnInit(): void {
        if (this.gameId) {
            this.afs
                .collection<Game>('games', (ref) =>
                    ref.where('id', '==', this.gameId)
                )
                .valueChanges()
                .subscribe((games) => {
                    this.game = games[0];
                    console.log(this.game);
                    if (
                        !this.registeredInGame &&
                        localStorage.getItem('user')
                    ) {
                        this.afs
                            .collection('games')
                            .doc(this.gameId)
                            .update({
                                players: [
                                    ...this.game.players,
                                    JSON.parse(
                                        localStorage.getItem('user')
                                    ) as Player,
                                ],
                            });
                        this.registeredInGame = true;
                    }
                });
        }
    }

    ngOnDestroy(): void {
        const updatedPlayers = _.remove(this.game.players, (player) => {
            return player.id !== JSON.parse(localStorage.getItem('user')).id;
        });

        this.afs.collection('games').doc(this.gameId).update({
            players: updatedPlayers,
        });
    }
}
