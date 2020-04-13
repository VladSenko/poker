import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
    private gameId: string;
    public game: Game;

    constructor(private route: ActivatedRoute, private afs: AngularFirestore) {
        this.route.paramMap.subscribe(
            (params: ParamMap) => (this.gameId = params.get('id'))
        );
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
                });
        }
    }
}
