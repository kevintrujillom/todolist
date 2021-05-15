import { Component, OnInit, Input } from '@angular/core';

import { TasksService } from '../../core/services/task/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { Task } from './../../core/models/task.model';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {

  @Input() createTask: boolean;

  tasks: Task[] = [];
  tasksOriginal: Task[] = [];
  tasksCopy: Task[] = [];

  search = '';
  activeSearch = false;

  actualPage: number = 1;

  constructor( 
    private tasksService: TasksService,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.getAll();
  }

  ngOnChanges(): void {
    if (this.createTask) this.getAll();
  }

  getAll(){
    this.tasksService.getAll().subscribe(tasks => {
      this.tasks = tasks.reverse();
    });
  }

  searchTasks(){
    
    if (this.activeSearch) this.tasks = this.tasksOriginal;

    if (this.search.length > 0) {

      this.createCopyTasks();
  
      const nTasks = this.tasks.filter(task => {
        return task.title.toLowerCase().includes(this.search);
      });
  
      this.tasks = nTasks;

    } else {

      this.showMessage(false, 'Debes ingresar un parametro de búsqueda');
    }
    
  }

  update(task: any){
    
    task.state = !task.state;
    
    this.tasksService.update(task).subscribe(
      data => {
        this.showMessage(true, 'Se actualizó con exito!');
        this.getAll();
      },
      error => {
        this.showMessage(false, 'Ocurrió un problema al actualizar la tarea');
      }
    );

  }

  delete(id: number){
    const response = confirm('¿Seguro que desea borrar la tarea?');
    if (response) this.confirmDelete(id);
  }

  confirmDelete(id: number){

    this.tasksService.delete(id).subscribe(
      data => {
        this.showMessage(true, 'Se eliminó con exito!');
        this.getAll();
      },
      error => {
        this.showMessage(false, 'Ocurrió un problema al eliminar la tarea');
      }
    );

  }
  
  showMessage(success: boolean, message: string = '') {

    if (success) {

      this.toastr.success(message, 'Tarea');

    } else {

      this.toastr.error(message, 'Tarea');
    }

  }

  createCopyTasks(){
    this.tasksCopy = this.tasks;
    this.tasksOriginal = this.tasks;
    this.activeSearch = true;
  }

  clearSearch() {
    this.tasks = this.tasksOriginal;
    this.activeSearch = false;
    this.search = '';
  }  
  
}
