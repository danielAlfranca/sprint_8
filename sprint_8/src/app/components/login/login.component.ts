import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { DialogService, DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements  OnDestroy {

  type = '';
  textInput = 'Suscribirse';
  textChange = 'Loggeate';
  linkChange = {mode:'login'};

  modalMsg = '';

  private subscription:Subscription;
  public modalRef!: DialogRef<any>;

  @ViewChild('templateModal') modalTemplate!:TemplateRef<any>

  constructor(
    private activatedRoute:ActivatedRoute, 
    private router:Router,
    private loginService:LoginService,
    private modalService: DialogService) {

    this.subscription = this.activatedRoute.queryParamMap.subscribe(params=>{

      this.type = params.get('mode') as string;
      this.textInput = this.type == 'sign-up' ? 'Suscribirse' : 'Entrar'; 
      this.textChange = this.type == 'sign-up' ?'Loggeate':'Date de alta';
      this.linkChange= {mode:this.type == 'sign-up' ? 'login':'sign-up'};

    })
   }

  user = {

    email:"",
    password:""
  }

  onSubmit(data:any){

    this.user.email = this.user.email.trim();
    this.user.password = this.user.password.trim();

    if(this.type=='sign-up') return this.signUp();

    this.login();
    
  }

  getList(){

    return JSON.parse(localStorage.getItem('sw_dag_logins_list') || '[]');
  }

  signUp(){
 
    if(!this.isNewUser()) {return this.alertModal('Este usuario ya existe')}  
    
    const list = this.getList();

    list.push(this.user);

    localStorage.setItem('sw_dag_logins_list',JSON.stringify(list));

    this.alertModal('Usuario guardado con exito');

    this.login();
  }

  login(){

    if(!this.authOK()){ return this.alertModal('Contraseña o email incorrecto')}

    this.loginService.log(this.user.email);
    
    this.router.navigate(['/starships']); 
    
    document.body.scrollTo(0, 0);
    
  }

  isNewUser(){

    return this.getList().every((e:any)=>e.email!=this.user.email);
  }

  authOK(){

    const user = this.getList().find((e:any)=>e.email==this.user.email);

    return Boolean(user) && user.password==this.user.password;
  }

  alertModal(msg:string){

    this.modalMsg = msg;
    this.modalRef = this.modalService.open(this.modalTemplate);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
