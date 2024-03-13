import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconDirective } from '@aeiforge-workspace/icon';
import { AlertHorizontalPositions, AlertVerticalPositions, injectAlertService } from '@aeiforge-workspace/alert';

@Component({
  standalone: true,
  imports: [RouterModule, IconDirective],
  selector: 'aeiforge-workspace-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'playground';
  readonly alertService = injectAlertService();

  public openAlert(): void {
    const ref = this.alertService.success('Hello, World!', {
      title: 'Title',
      options: {
        duration: 3000,
        horizontalPosition: AlertHorizontalPositions.LEFT,
        verticalPosition: AlertVerticalPositions.BOTTOM,
      }
    });
  }
}
