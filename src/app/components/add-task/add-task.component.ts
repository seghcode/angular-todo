import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import {Subscription} from 'rxjs'
import { Task } from 'src/app/Task';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTodo = new EventEmitter<Task>();

  title: string = '';
  description: string = '';
  uid: any;
  completed: boolean = false;
  message = ''

  // for toggling the form
  showAddTask!: boolean
  subscription: Subscription


  constructor(private uiService:UiService) {
    this.subscription = this.uiService.onToggle().subscribe({
      next: (value) => (this.showAddTask = value),
    });
  }

  ngOnInit(): void {}

  // submitting todo
  onSubmit() {
    if (!this.title) {
      alert('Please add the title');
      return;
    }
    if (this.title.length < 3) {
      alert('Title must be atleast 3 characters');
      return;
    }
    if (!this.description) {
      alert('Please add a description');
      return;
    }
    if (this.description.length < 20) {
      alert('Description Should be at least 20 characters');
      return;
    }
    // console.log(this.title, this.description);
    const newTask = {
      title: this.title,
      description: this.description,
      uid: this.uid,
      completed: this.completed,
    };
    this.onAddTodo.emit(newTask);
    this.message = 'Added Successfully'
    this.title = '';
    this.description = '';
  }
}
