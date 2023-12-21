import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  inSubmission = false
  isLoggedIn = false

  constructor(private authService: AuthService){}

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
   ])

   email = new FormControl('', [
      Validators.required,
      Validators.email
   ])


   password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/gm)
   ])

   registerForm = new FormGroup({ 
    name: this.name,
    email: this.email,
    password: this.password,
 })



 emailLogin = new FormControl('', [
  Validators.required,
  Validators.email
])


passwordLogin = new FormControl('', [
  Validators.required,
  Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/gm)
 ])


 loginForm = new FormGroup({ 
  emailLogin: this.emailLogin,
  passwordLogin: this.passwordLogin
})


subscribe(){
  this.inSubmission = true
  this.isLoggedIn = true
  this.authService.signup(this.name.value, this.email.value, this.password.value).subscribe(response => {
    const reponseMessage = <HTMLInputElement>document.getElementById("signupResponse");
    reponseMessage.innerHTML = response.message
    reponseMessage.style.color = 'black'
  });
}

login(){
  this.inSubmission = true
  this.isLoggedIn = true
  this.authService.login(this.emailLogin.value, this.passwordLogin.value).subscribe(response => {
    const reponseMessage = <HTMLInputElement>document.getElementById("signinResponse");
    reponseMessage.innerHTML = response.message
    reponseMessage.style.color = 'black'
    
  })
}

signOut(){
  this.isLoggedIn = false
}


}
