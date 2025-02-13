import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-search',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  @Input() searchText: string = '';
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() resetSearch: EventEmitter<void> = new EventEmitter();

  isSearch: boolean = false;

  searchEvent() {
    if (this.searchText !== undefined && this.searchText !== null) {
      this.search.emit(this.searchText); // Envoie la valeur actuelle
    } else {
      this.search.emit(''); // Évite d'envoyer `undefined`
    }
    this.isSearch = true;

  }

  resetSearchEvent() {
    console.log(this.isSearch);
    this.resetSearch.emit(); 
    this.searchText = ''; 
    this.isSearch = false;
  }

}
