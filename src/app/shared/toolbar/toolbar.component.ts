import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() buttonText: string = '';
  @Input() routerLink: string = '';
}
