import { Component, OnInit } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Game } from '../models/game.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
    selector: 'app-games-list',
    templateUrl: './games-list.component.html',
    styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit {
    public games: Game[];
    public users: User[];
    public selectedUserId: number;

    private selectedGameId: string;

    constructor(
        private afs: AngularFirestore,
        private modalService: NgbModal,
        private router: Router
    ) {
        this.afs
            .collection('games')
            .valueChanges()
            .subscribe((games: Game[]) => {
                this.games = games;
                console.log(this.games);
            });

        this.afs
            .collection('users')
            .valueChanges()
            .subscribe((users: User[]) => {
                this.users = users;
            });
    }

    ngOnInit(): void {}

    public openSetUserDialog(dialog: any, selectedGameId: string): void {
        this.selectedGameId = selectedGameId;
        this.modalService.open(dialog, { centered: true });
    }

    public navigateToGame(): void {
        this.modalService.dismissAll();
        if (this.selectedUserId && this.selectedGameId) {
            const selectedUser = _.find(
                this.users,
                (user) => user.id === +this.selectedUserId
            );
            localStorage.setItem('user', JSON.stringify(selectedUser));
            this.router.navigate(['/game', this.selectedGameId]);
        }
    }
}
