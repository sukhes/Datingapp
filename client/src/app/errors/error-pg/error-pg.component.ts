import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-pg',
  templateUrl: './error-pg.component.html',
  styleUrls: ['./error-pg.component.css']
})
export class ErrorPgComponent implements OnInit {
  model: any = {};
  baseUrl = "https://localhost:5001/api";
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get400Error(){
    this.http.get(this.baseUrl + "/buggy/bad-request").subscribe(resp =>{
      console.log(resp);
    },
    err =>{
      console.log(err);
    }
    );
  }

  get400ValidationError(){
    this.http.post(this.baseUrl + "/account/register", {}).subscribe(resp =>{
      console.log(resp);
    },
    err =>{
      console.log(err);
      this.validationErrors = err;
    }
    );
  }

  get401Error(){
    this.http.get(this.baseUrl + "/buggy/auth").subscribe(resp =>{
      console.log(resp);
    },
    err =>{
      console.log(err);
    }
    );
  }
  
  get404Error(){
    this.http.get(this.baseUrl + "/buggy/not-found").subscribe(resp =>{
      console.log(resp);
    },
    err =>{
      console.log(err);
    }
    );
  }
  
  get500Error(){
    this.http.get(this.baseUrl + "/buggy/server-error").subscribe(resp =>{
      console.log(resp);
    },
    err =>{
      console.log(err);
    }
    );
  }
  
}
