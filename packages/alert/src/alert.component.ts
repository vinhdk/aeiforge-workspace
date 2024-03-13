import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
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
import { fromEvent, repeat, takeUntil, tap, timer } from 'rxjs';

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
        (click)="close()"
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
    '(@slideIn.done)': 'animationDone()',
  }
})
export class AlertComponent implements OnInit {
  public static readonly ALERT_ANIMATION_DURATION = 300;

  @Output()
  public readonly closeClick = new EventEmitter<Event>();

  @Output()
  public readonly afterClosed = new EventEmitter<Event>();

  @Output()
  public readonly afterOpened = new EventEmitter<Event>();

  public readonly config = inject(ALERT_CONFIG);

  public readonly fadeInAnimation = signal(this._generateAnimation('enter'));
  public readonly slideInAnimation = signal(this._generateAnimation('right'));
  public readonly heightCollapseAnimation = signal(this._generateAnimation('enter'));
  public readonly elementRef = inject(ElementRef);

  public ngOnInit(): void {
    this._autoClose();
  }

  public animationDone(): void {
    if (this.fadeInAnimation().value === 'leave') {
      this.afterClosed.emit();
    } else {
      this.afterOpened.emit();
    }
  }

  public close(): void {
    this.closeClick.emit();
    this.heightCollapseAnimation.set({
      ...this.heightCollapseAnimation(),
      value: 'leave',
    });
    this.slideInAnimation.set({
      ...this.slideInAnimation(),
      value: '*'
    });
    this.fadeInAnimation.set({
      ...this.fadeInAnimation(),
      value: 'leave'
    });
  }

  protected _autoClose(): void {
    const duration = this.config.options.duration;
    if (!duration) {
      return;
    }

    timer(duration)
      .pipe(
        takeUntil(fromEvent(this.elementRef.nativeElement, 'mouseenter')),
        repeat({delay: () => fromEvent(this.elementRef.nativeElement, 'mouseleave')}),
        takeUntil(this.closeClick.asObservable()),
        tap(() => this.close()),
      )
      .subscribe();
  }

  protected _generateAnimation(value: string): IAlertAnimation {
    return {
      value,
      params: {
        duration: AlertComponent.ALERT_ANIMATION_DURATION,
      },
    };
  }
}
