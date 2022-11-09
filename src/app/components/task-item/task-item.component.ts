import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/Task';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleCompleted: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();

  faTrash = faTrash;
  faPen = faPen;

  editable = false;

  constructor() {}

  ngOnInit(): void {}

  // delete a todo
  onDelete(uid: Task) {
    this.onDeleteTask.emit(uid);
  }

  // toggle completed
  onToggle(completed: Task) {
    this.onToggleCompleted.emit(completed);
  }

  // update task
  onUpdate(title:string, description:string) {
    const updatedTask: Task = {...this.task};
    updatedTask.description = description;
    updatedTask.title = title;
    this.onUpdateTask.emit(updatedTask);

  }
}
