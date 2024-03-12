import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ae-alert-host',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': "'ae-alert-host'",
    '[id]': "id()"
  }
})
export class AlertHostComponent {
  public id = signal<string>('');
}
