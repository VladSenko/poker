import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './table/table.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamesListComponent } from './games-list/games-list.component';
import { GameComponent } from './game/game.component';

@NgModule({
    declarations: [AppComponent, TableComponent, CreateGameComponent, GamesListComponent, GameComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
