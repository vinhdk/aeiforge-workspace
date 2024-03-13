import { ChangeDetectionStrategy, Component, computed, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertVerticalPositions } from './enums/alert-position.enum';

@Component({
  selector: 'ae-alert-host',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': "'ae-alert-host'",
    '[class.!flex-col-reverse]': 'reverse()',
    '[id]': "id()"
  }
})
export class AlertHostComponent {
  public id = signal<string>('');
  public reverse = computed(() => this.id().includes(AlertVerticalPositions.BOTTOM));
}
