import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

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

  constructor(private menuController: MenuController) { }

  ngOnInit() {}

  search(): void {
    console.log('Buscando:', this.searchQuery);
  }

  onToggleMenu(): void {
    this.menuController.open().then(() => {
      console.log('Menu opened');
    }).catch(err => {
      console.error('Error opening menu:', err);
    });
  }
  
}
