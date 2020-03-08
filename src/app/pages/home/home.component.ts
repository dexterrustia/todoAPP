import { Component, OnInit } from '@angular/core'; 
import { TodoService, Todo } from '../../api/todoService/todo.service'  
import { FormBuilder,FormGroup,Validators } from '@angular/forms'; 
import { NgxSpinnerService } from 'ngx-spinner'; 
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit { 

  todoList : any; 
  frmTodo: FormGroup;
  todo : Todo;
  todoID : String; 

  constructor(private todoServ : TodoService, private formBuilder: FormBuilder, private spinner: NgxSpinnerService) { 
    this.frmTodo = this.formBuilder.group({ 
      userID : "aaaaaa",
      title : [null,Validators.required],
      description : null,
      level : [null,Validators.required],
      status : [null,Validators.required],
      dueDate : [null,Validators.required]
    }); 
    this.clearScopes();
    this.todo.userID = "aaaaaa";
  }

  ngOnInit(): void {  
    this.spinner.show();
    this.getTodos();
  }

  clearScopes(){
    this.todo = {
      userID : "",
      title : "",
      description : "",
      level : "",
      status : "",
      dueDate : ""
    };
    this.todoID = ""
  } 

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
    console.log('event :'+ JSON.stringify(event))
    console.log("data :"+ JSON.stringify(event.container.data))
    console.log("prev data :"+ JSON.stringify(event.previousContainer.data))
  }

  getTodos(){  
    this.todoServ.getTodos().toPromise().then(res =>{
      this.todoList = res
      this.spinner.hide(); 
      console.log( JSON.stringify(res) )  
    }).catch(err => {
      console.log(err)
    }); 
  } 

  saveTodo(obj : Todo){
    //{year: 2020, month: 3, day: 18}
    console.log(obj)  
    //this.spinner.show();
    obj.dueDate = obj.dueDate["month"]+"-"+obj.dueDate["day"]+"-"+obj.dueDate["year"] 
    if(this.todoID == ""){
      this.todoServ.postTodo(obj).toPromise().then(res => {
        console.log(res)
        this.getTodos();
      }).catch(err => {
        console.log(err)
      })
    }else{
      this.todoServ.putTodo(this.todoID,obj).toPromise().then(res => {
        console.log(res)
        this.getTodos();
      }).catch(err => {
        console.log(err)
      })

    } 
    this.clearScopes();
    
  }
  getTodo(obj){
    this.todoID = obj._id;
    this.todo = {
      userID : obj.userID,
      title : obj.title,
      description : obj.description,
      level : obj.level,
      status : obj.status,
      dueDate : obj.dueDate
    };
    //console.log("todoID :" + JSON.stringify(this.todoID))
   // console.log("todo :" + JSON.stringify(this.todo))
  }

  deleteTodo(id : String){ 
    console.log("id"+id) 
    this.spinner.show();
    this.todoServ.deleteTodo(id).toPromise().then(res => {
      console.log(res)
      this.getTodos();
    }).catch(err => {
      console.log(err)
    })

  }
 

}
