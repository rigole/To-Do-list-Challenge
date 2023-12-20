import { Component, QueryList } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  isHidden = true;
 
  

  showOption(){
    this.isHidden = true;
  }
  hideOption(){
    this.isHidden = false;
  }

   


}
