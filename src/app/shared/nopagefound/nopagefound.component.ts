import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/quien']);
    }, 3000);
  }

}
