import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  currentYear: number = new Date().getFullYear();
  searchQuery: string = '';
  cartTotal: number = 0;
  cartItemCount: number = 0;
  currentIndex: number = 0;

  constructor() { }

  ngOnInit() {}

  search(): void {
    console.log('Buscando:', this.searchQuery);
  }
}
