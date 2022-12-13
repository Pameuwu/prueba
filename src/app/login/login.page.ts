import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { StorageService } from '../storage.service';
import { ConsumirapiService } from '../consumirapi.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit
{

  mensaje: String;
  lista = [];
  nombre: String;


  constructor( private consumirapi: ConsumirapiService,
               private storage: StorageService,
               private router: Router ) {}
  
               ngOnInit() {
                this.consumirapi.getUsers();
                this.lista = this.consumirapi.listado;
                console.log(this.lista);
                this.storage.init();
              }
             
              async checkear(nom: HTMLInputElement, cont: HTMLInputElement)
              {
                this.nombre = nom.value;
                //console.log(this.apirest.listado.find(({username}) => username === this.nombre));
                this.lista = this.consumirapi.listado.find(({nombre}) => nombre === this.nombre);
                //console.log(this.lista);
             
            
                if(nom.value == "")
                {
                  this.mensaje = " Ingrese nombre de usuario";
                }
                else if(cont.value == "")
                {
                  this.mensaje = " Por favor, ingrese su contraseña";
                }
                else if(!this.consumirapi.listado.find(({nombre}) => nombre === this.nombre)){
                  this.mensaje = " Usuario no existe";
                }
                else if(cont.value != "1234"){
                  this.mensaje = " Contraseña incorrecta";
                }
                else
                {
                  this.storage.agregar('id', this.lista['id']);
                  this.router.navigate(['/menu', this.lista['id']]);
                  nom.value = '';
                  cont.value = '';
                  this.mensaje = '';
                }

            
              }

  
}
    

