import { Component, OnInit} from '@angular/core';
import { AuthService } from '../auth-service.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  isHidden = true;
  usertoken: any
  data : any [] = []
  userInfo = false
  filteredItems: any[] = [];
  filterText: string = '';

  showOption(){
    this.isHidden = true;
  }
  hideOption(){
    this.isHidden = false;
  }

  
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.userInfo = this.isAuthenticated()
    this.usertoken = localStorage.getItem("usertoken")
    const userNumber = Number(this.usertoken)
    this.authService.getAllTask(userNumber).subscribe(response => {
     this.data = response
     this.applyFilter()
    
    })

    
  }

  applyFilter(){
    // Perform the filtering based on the filterText
    this.filteredItems = this.data.filter(item =>
      item.title.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }






  isAuthenticated(): boolean {
    return !!localStorage.getItem('usertoken');
  }
 

   


}
