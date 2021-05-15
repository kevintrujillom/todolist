import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TasksService } from '../../core/services/task/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { Task } from './../../core/models/task.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  @Output() taskAdded: EventEmitter<boolean> = new EventEmitter();
  
  formCreate: FormGroup;

  task: Task = {
    id: '',
    title: '',
    state: false,
    createdAt: '',
  };

  constructor( 
    private tasksService: TasksService,
    private toastr: ToastrService ) {
      this.formCreate = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  createFormGroup(){
    return new FormGroup({
      title: new FormControl('', [ Validators.required ]),
      state: new FormControl(false)
    });
  }

  clearForm(){
    this.formCreate.reset();
  }

  create(){

    if (this.formCreate.valid) {

      this.task = this.formCreate.value;
      this.task.createdAt = this.getDate();

      this.tasksService.create(this.task).subscribe(
        data => {
          this.taskAdded.emit(true);
          this.showMessage(true);
          this.clearForm();
        },
        error => {
          this.showMessage(false);
        }
      );      

    } else {

      this.showMessage(false, 'Debes ingresar un título');
    }

  }
  
  showMessage(success: boolean, message: string = '') {

    if (success) {

      this.toastr.success('Se creo con exito!', 'Tarea');

    } else {

      if (message.length > 1) {

        this.toastr.error(message, 'Formulario');

      } else {

        this.toastr.error('Ocurrió un problema al registrar la tarea', 'Tarea');
      }

    }

  }

  getDate(){
    const date = new Date();
    const createdAt = date.toISOString();
    return createdAt;
  }

  get title(): any { return this.formCreate.get('title'); }
  get state(): any { return this.formCreate.get('state'); }

}
