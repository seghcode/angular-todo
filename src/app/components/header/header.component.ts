import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Century Todo';
  showAddTask!: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe({
      next: (value) => (this.showAddTask = value),
    });
  }

  ngOnInit(): void {}

  toggleAddTask() {
    // console.log('toggle');
    this.uiService.toggleAddTask();
  }
}
