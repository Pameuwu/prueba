import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  users:any= [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getusers().subscribe(res =>{
      console.log("Res", res)
      this.users = res;
    });
  }
  getusers(){
    return this.http
    .get('assets/server/servidor.json')
    .pipe(
      map((res:any)=>{
      return res.Alumno;})
    )
  }

}
