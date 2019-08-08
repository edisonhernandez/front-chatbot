import { Component, OnInit } from '@angular/core';
import {Chat} from '../../model/chat';
import {ChatService} from '../../servicies/chat.service';
declare var $:any;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:[ChatService]
})
export class ChatComponent implements OnInit {
  public chatU;
  public status;
  public messages=[];
  constructor(private _chatService:ChatService) {
    this.chatU = new Chat("");
    this.status = 'n';
   }

  ngOnInit() {
  }

  enviarChat(){


    console.log(this.chatU)
   
 this.messages.push({type:'c',texto:this.chatU.texto})
    
  this.status = 'process';
    this._chatService.prueba(this.chatU).subscribe(
      response=>{
        if(response.watsonResultado){
          console.log(response.watsonResultado)
          this.messages.push({type:'a',texto:response.watsonResultado.respuesta.mensaje})
          setTimeout(()=>{
            if(response.watsonResultado.respuesta.prestamo != null){
             this.messages.push({type:'prestamosList',options:response.watsonResultado.respuesta.prestamo.options})
             console.log(this.messages)
            }
            $("#content-chat").animate({ scrollTop: $('#content-chat').prop("scrollHeight")}, 1000);
            this.status = 'n';
          }, 2000);
        

         
        }
      },
      error=>{
        console.log(<any>error)
      }
    )


  }



  enviarNumPrestamo(text){
  
    this.chatU.texto = text;
    console.log(this.chatU)
   this._chatService.prueba(this.chatU).subscribe(
      response=>{
        if(response.watsonResultado){
          console.log(response.watsonResultado)
         
      
        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
}
