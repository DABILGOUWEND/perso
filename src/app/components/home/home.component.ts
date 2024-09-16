import { Component, effect, inject, OnInit } from '@angular/core';
import { UserStore } from '../../store/appstore';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit {
  constructor() {
    effect(() => {    
console.log(this._user_store.users())
  } )
}
  ngOnInit() {
    this._user_store.loadUsers();
  }
  _user_store = inject(UserStore);


}
