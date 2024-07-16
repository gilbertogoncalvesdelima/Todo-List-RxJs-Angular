import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  showNav: boolean = true;

  constructor(private router: Router) {

  }

  ngOnInit(){

  }
}
