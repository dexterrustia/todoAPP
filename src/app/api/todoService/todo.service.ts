import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

export interface Todo {
  userID : String,
  title : String,
  description : String,
  level : String,
  status : String,
  dueDate : String
}

@Injectable({
  providedIn: 'root'
}) 

export class TodoService {

  private SERVER_URL = "http://localhost:8080";
 


  constructor(private httpClient : HttpClient) { }

  public getTodos(){  
    return this.httpClient.get(this.SERVER_URL+"/todo")
  } 
  public postTodo(obj : Todo){
    return this.httpClient.post(this.SERVER_URL+"/todo",obj)  
  }
  public deleteTodo(todoID  : String){ 
    return this.httpClient.delete(this.SERVER_URL+"/todo/"+todoID)  
  }
  public putTodo(todoID: String,obj : Todo){
    return this.httpClient.put(this.SERVER_URL+"/todo/"+todoID,obj) 
  }
}
