import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TodoModel } from './models/todo.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor( 
 private http:HttpClient
  ){}

  addModel: TodoModel = new TodoModel();
  updateModel: TodoModel = new TodoModel();

  updateIndex: number = 0;
  isUpdateFormActive: boolean = false;
  todos: TodoModel[] = [ ];

 getAll(){
  this.http.get<TodoModel[]>(" http://localhost:5001/todos").subscribe(res=>{
    this.todos=res;
  })
 }

  save() {

   this.http.post(" http://localhost:5001/todos",this.addModel).subscribe(res=>{
    this.getAll();
    this.addModel=new TodoModel;
    Swal.fire({
      title: "create is succesfull",
      showCloseButton: false,
      showConfirmButton: false,
      timer: 3000,
      position: "bottom-right",
      toast: true,
      icon: "success"
    })
   })
   
   

  }

  remove(index: number) {
    Swal.fire({
      title: "eminmisin",
      showCancelButton: true,
      cancelButtonText: 'cancel',
      confirmButtonText: 'delete?',
      icon: 'question'
    }).then((res: any) => {
      if (res.isConfirmed) {
        this.todos.splice(index, 1);
      }

    })
  }


  get(index: number) {
    this.updateModel = this.todos[index]
    this.updateIndex = index;
    this.isUpdateFormActive = true
  }

  changeCompleted(data:TodoModel){
    this.http.put(`http://localhost:5001/todos/${data.id}`,data ).subscribe(res=>{
      this.getAll();
    })
  }

  update() {
    this.todos[this.updateIndex] = this.updateModel;

    this.isUpdateFormActive = false;

    Swal.fire({
      title: "create is succesfull",
      showCloseButton: false,
      showConfirmButton: false,
      timer: 3000,
      position: "bottom-right",
      toast: true,
      icon: "info"
    })


  }

}
