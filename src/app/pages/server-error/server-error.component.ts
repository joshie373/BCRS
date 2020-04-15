import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.hide();
  }
  
 
  //hides elements and text untill timeout completes
  hide(){
    setTimeout(function(){
      var x = document.getElementById("image500");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
      document.getElementById("video500").style.display="none";
      document.getElementById("wrong").style.display="block";
      document.getElementById("back").style.display="block";
    },2000);
  }

  //goes back to the homepage
  home(){
    this.router.navigate(['/']);
  }
}
