import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {
  inSubmission = false
  userId = 0
  textAreaValue:any = ''

  @ViewChild('description') description: any;

  userInfo = false
  constructor(private authService: AuthService){

  }



  ngOnInit(): void {
    this.userInfo = this.isAuthenticated()
  }

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
   ])

   email = new FormControl('', [
      Validators.required,
      Validators.email
   ])

   category = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
   ])

   title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
   ])

   textArea = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
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

taskForm = new FormGroup({
  title : this.title,
  category: this.category,
})


subscribe(){
  this.inSubmission = true
  this.userInfo = true
  this.authService.signup(this.name.value, this.email.value, this.password.value).subscribe(response => {
  this.userId = response.userId
  localStorage.setItem("usertoken", this.userId as unknown as string)
  const reponseMessage = <HTMLInputElement>document.getElementById("signupResponse");
  reponseMessage.innerHTML = response.message
  reponseMessage.style.color = 'black'

  });
}

login(){
  this.inSubmission = true
  this.userInfo = true
  this.authService.login(this.emailLogin.value, this.passwordLogin.value).subscribe(response => {
    const reponseMessage = <HTMLInputElement>document.getElementById("signinResponse");
    this.userId = response.userId
    localStorage.setItem("usertoken", this.userId as unknown as string)
    reponseMessage.innerHTML = response.message
    reponseMessage.style.color = 'black'
  })
  

}

isAuthenticated(): boolean {
  return !!localStorage.getItem('userInfo');
}

signOut(){
  this.userInfo = false
  localStorage.removeItem('userInfo')

}

addTask(){
  const usertoken = localStorage.getItem("usertoken")
  const userNumber = Number(usertoken)
  const textAreaValue = <HTMLInputElement>document.getElementById("textarea");
  
  this.authService.addTask(this.title.value,textAreaValue.value,this.category.value, userNumber).subscribe(response => {
    const reponseMessage = <HTMLInputElement>document.getElementById("taskResponse")
    reponseMessage.innerHTML = response.message
    reponseMessage.style.color = 'black'
  })
}





}
