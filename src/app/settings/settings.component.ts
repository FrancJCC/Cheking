import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="settings-container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class SettingsComponent {}
