import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ALERT_CONFIG } from './tokens/alert-config.token';
import { IconDirective } from '@aeiforge-workspace/icon';
import { AlertContentComponent } from './alert-content.component';
import { fadeIn, heightCollapse, slideIn } from './animations/alert.animation';
import { IAlertAnimation } from './interfaces/alert-animation.interface';
@Component({
  selector: 'ae-alert',
  standalone: true,
  imports: [CommonModule, IconDirective, AlertContentComponent],
  template: `
    <article
      role="alert"
      class="ae-alert ae-alert--{{config.state.toLowerCase()}}"
      [style.--ae-alert-horizontal-offset]="config.options.horizontalOffset"
      [style.--ae-alert-verticle-offset]="config.options.verticalOffset"
    >
      <i [aeIcon]="config.options.icon || 'outlined-action-info'"></i>
      <main>
        <section class="ae-alert__information">
          <label *ngIf="config.title as title">{{title}}</label>
          <ae-alert-content *ngIf="config.content as content" [content]="content"></ae-alert-content>
        </section>
        <ae-alert-content *ngIf="config.footer as footer" [content]="footer"></ae-alert-content>
      </main>
      <i
        *ngIf="!config.options.hiddenCloseIcon"
        [aeIcon]="'filled-navigation-close'"
        (click)="closeClick.emit()"
      ></i>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [fadeIn, slideIn, heightCollapse],
  host: {
    '[@fadeIn]': 'fadeInAnimation()',
    '[@slideIn]': 'slideInAnimation()',
    '[@heightCollapse]': 'heightCollapseAnimation()',
  }
})
export class AlertComponent {
  public static readonly ALERT_ANIMATION_DURATION = 300;
  @Output()
  public readonly closeClick = new EventEmitter<Event>();

  @Output()
  public readonly afterAnimationStart = new EventEmitter<Event>();

  @Output()
  public readonly afterAnimationEnd = new EventEmitter<Event>();

  @Output()
  public readonly closed = new EventEmitter<Event>();

  @Output()
  public readonly opened = new EventEmitter<Event>();

  public readonly config = inject(ALERT_CONFIG);

  public readonly fadeInAnimation = signal(this.generateAnimation('enter'));
  public readonly slideInAnimation = signal(this.generateAnimation('right'));
  public readonly heightCollapseAnimation = signal(this.generateAnimation('enter'));
  protected generateAnimation(value: string): IAlertAnimation {
    return {
      value,
      params: {
        duration: AlertComponent.ALERT_ANIMATION_DURATION,
      },
    };
  }
}
