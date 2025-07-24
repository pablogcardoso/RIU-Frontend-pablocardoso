import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    standalone: false,
    selector: 'app-search-bar',
    template: `
        <mat-card class="hero-list-search">
            <mat-icon class="icon-search">search</mat-icon>
            <input id="searchName" [placeholder]="placeholder" class="hero-list-search-name" (input)="search($event)" />
        </mat-card>
    `,
    styles:  `
        .hero-list-search {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;

            .hero-list-search-name {
                border-radius: 5px;
                background-color: #f5f5f5;
                margin: 8px;
                border: none;
                height: 2rem;
                padding: 0.5rem;
                width: 100%;
                
            }
            .icon-search {
                right: 10px;
                margin-right: 10px;
                position: absolute;
                color: #9e9e9e;
                font-size: 2rem;
            }
            input:focus-visible {
                outline: none;
            }
        }
    `,
})

export class SearchBarComponent implements OnInit {

    @Input() placeholder: string = 'Buscar';
    @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit() { }

    search(event: Event) {
        this.searchEvent.emit((event.target as HTMLInputElement).value.trim());
    }
}