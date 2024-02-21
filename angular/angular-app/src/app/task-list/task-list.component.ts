// task-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { Task } from '../task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  task_form: FormGroup; // Add this line to declare task_form

  constructor(private apiService: ApiService, private form_builder: FormBuilder) {
    // Initialize task_form in the constructor
    this.task_form = this.form_builder.group({
      title: '',
      content: '',
      due_date: ''
    });

    // Set validators for fields.
    this.task_form.controls["title"].setValidators([Validators.required]);
    this.task_form.controls["content"].setValidators([Validators.required]);
    this.task_form.controls["due_date"].setValidators([Validators.required]);
  }

  ngOnInit() {
    this.getTasks();
  }

  public getTasks() {
    console.log("test");
    this.tasks$ = this.apiService.getTasks();
  }

  onSubmit() {
    // Create the Task.
    this.apiService.postTask(this.task_form.value)
      .subscribe(
        (response) => {
          console.log(response);
          this.getTasks();
        }
      );
  }

  deleteTask(task_id: number) {
    this.apiService.deleteTask(task_id)
      .subscribe(
        (response) => {
          console.log(response);
          this.getTasks();
        }
      );
  }

  updateTask(task: Task) {
    this.apiService.putTask(task)
      .subscribe(
        (response) => {
          console.log(response);
          this.getTasks();
        }
      );
  }
}
