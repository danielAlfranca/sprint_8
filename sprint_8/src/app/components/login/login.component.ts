import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  type = '';
  textInput = 'Suscribirse';
  private subscription:Subscription;

  constructor(
    private activatedRoute:ActivatedRoute, 
    private router:Router,
    private loginService:LoginService) {

    this.subscription = this.activatedRoute.queryParamMap.subscribe(params=>{

      this.type = params.get('mode') as string;
      this.textInput = this.type == 'sign-up' ? 'Suscribirse' : 'Entrar'; 
    })
   }

  user = {

    email:"",
    password:""
  }

  ngOnInit(): void {

    console.log(JSON.parse (localStorage.getItem('sw_dag_logins_list') || '[]'))
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
 
    if(!this.isNewUser()) {return alert('Este usuario ya existe')}  
    
    const list = this.getList();

    list.push(this.user);

    localStorage.setItem('sw_dag_logins_list',JSON.stringify(list));

    alert('Usuario guardado con exito');

    this.login();
  }

  login(){

    if(!this.authOK()){ return alert('Contraseña o email incorrecto')}

    this.loginService.log(this.user.email);
  
    this.router.navigate(['/starships']);  
    
  }

  isNewUser(){

    return this.getList().every((e:any)=>e.email!=this.user.email);
  }

  authOK(){

    const user = this.getList().find((e:any)=>e.email==this.user.email);

    return Boolean(user) && user.password==this.user.password;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
