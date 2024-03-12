import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconDirective } from '@aeiforge-workspace/icon';
import { AlertService } from '@aeiforge-workspace/alert';

@Component({
  standalone: true,
  imports: [RouterModule, IconDirective],
  selector: 'aeiforge-workspace-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'playground';
  public readonly alertService = inject(AlertService);

  public openAlert(): void {
    const ref = this.alertService.success('Hello, World!', {
      title: 'Title',
      options: {
        duration: 3000,
      }
    });
  }
}
