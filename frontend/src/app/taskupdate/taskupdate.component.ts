import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'
import { Location } from '@angular/common'

@Component({
  selector: 'app-taskupdate',
  templateUrl: './taskupdate.component.html',
  styleUrls: ['./taskupdate.component.css']
})
export class TaskupdateComponent implements OnInit{
  
  task: any;
  title:any;
  description:any
  category:any

  categoryValue = '';
  descriptionValue = '';
  titleValue = '';
  updated_date = new Date()
  updatedTask = { title: '', category: '', description: '', updated_at: this.updated_date  }


  constructor(private authService: AuthService, private route:ActivatedRoute, private router: Router, private location: Location){}
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const taskId = params['id'];
      if(taskId){
        this.authService.getTaskById(taskId).subscribe(data => {
          this.task = data
          //this.updatedTask = {...data}
          //console.log(this.updated_date)
        })
      }
    })
  }

  updateTask(){
    const taskId = this.task.id;
    this.categoryValue = (<HTMLInputElement>document.getElementById("category")).value;
    this.descriptionValue = (<HTMLInputElement>document.getElementById("description")).value;
    this.titleValue = (<HTMLInputElement>document.getElementById("title")).value;
    this.updatedTask = { title: this.titleValue, category: this.categoryValue, description: this.descriptionValue, updated_at: this.updated_date  }
    this.authService.updateTask(taskId, this.updatedTask).subscribe((response) => {
      const reponseMessage = <HTMLInputElement>document.getElementById("taskAdded")
      reponseMessage.innerHTML = response.message
      reponseMessage.style.color = 'black';
      });
    }

    deleteTask(){
      const taskId = this.task.id;
      this.authService.deleteTask(taskId).subscribe(response => {
        alert(response.message)
        this.location.back();
      })
      
    }
}
