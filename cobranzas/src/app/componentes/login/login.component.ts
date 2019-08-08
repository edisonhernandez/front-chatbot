import { Component, OnInit } from '@angular/core';
import {PersonaLog} from '../../model/personaLogin';
import {PersonaService} from '../../servicies/persona.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[PersonaService]
})
export class LoginComponent implements OnInit {

  public usuarioLogueo:PersonaLog;
  public status;
  public identity;
  public token;
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _personaService:PersonaService) { 
    this.usuarioLogueo = new PersonaLog("","","");
    this.identity = this._personaService.obtIdentity();
  }

  ngOnInit() {
    if(this.identity != null){
      this._router.navigate(['cobranzas']);
    }
  }

  onSubmit(){
    this.status = 'procesando';
console.log(this.usuarioLogueo)
 this._personaService.singUp(this.usuarioLogueo).subscribe(
      
      response=>{

        if(response.usuario && response.n == '2'){
         
          this.status = 'success';
          this.identity = response.usuario;
           //PERSISTIR DATOS DEL USUARIO
           localStorage.setItem('identity', JSON.stringify(this.identity));
           //CONSEGUIR EL TOKEN
           this.getToken();
          
        
          this._router.navigate(['cobranzas']);
        }else{
          this.status = 'error';
         
        }
      }, 
      error =>{
        var errorMessage = <any>error;
      
        if(error.error.n == '0' || error.error.n == '1' ){
          this.status = 'error'; 
      
        }else if(error.error.n == '5'){
          this.status = 'error'; 
       
        }
      }
    )
  }
getToken(){
  
  this._personaService.singUp(this.usuarioLogueo, 'true').subscribe(
      
    response=>{
      this.token = response.token;
      console.log(this.token)
      if(this.token.lenght <= 0 ){
        this.status = 'error';
        
      }else{
        this.status = 'success';
        //PERSISTIR token del usuario
        localStorage.setItem('token',this.token);

        //CONSEGUIR EL TOKEN
      }
    }, error =>{
      var errorMessage = <any>error;
     
      console.log(errorMessage);
      if(errorMessage != null){
        this.status = 'error';  
      }
    })

}

}
