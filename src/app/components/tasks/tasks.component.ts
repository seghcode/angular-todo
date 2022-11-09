import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
// import { TASKS } from 'src/app/mock-tasks';
import { Task } from '../../Task';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  // delete task
  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe({
      next: () => (this.tasks = this.tasks.filter((t) => t.uid !== task.uid)),
    });
  }

  // toggle completed
  toggleCompleted(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTaskCompleted(task).subscribe();
  }

  // add new todo
  addTodo(task: Task) {
    this.taskService.addTodo(task).subscribe((task) => {
      this.tasks.unshift(task);
    });
  }

  // update task
  updateTask(task: Task) {
    this.taskService
      .updateSingleTask(task.uid!, task.title, task.description)
      .subscribe({
        next: (updatedTask) => {
          this.tasks = this.tasks.map((t) => {
            if (t.uid == task.uid) {
              return updatedTask;
            }
            return t;
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
