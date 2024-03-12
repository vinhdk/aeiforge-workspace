import { ChangeDetectionStrategy, Component, computed, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertContent } from './types/alert-content.type';
import { ComponentType } from '@angular/cdk/overlay';

@Component({
  selector: 'ae-alert-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    @switch (contentType()) {
      @case ('string') {
        <p>{{contentString()}}</p>
      }
      @case ('template') {
        <ng-container *ngTemplateOutlet="contentTemplate()"></ng-container>
      }
      @case ('component') {
        <ng-container *ngComponentOutlet="contentComponent()"></ng-container>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AlertContentComponent<TContent> {
  public content = input<AlertContent<TContent>>('');

  public contentString = computed(() => this.content() as string);
  public contentTemplate = computed(() => this.content() as TemplateRef<TContent>);
  public contentComponent = computed(() => this.content() as ComponentType<TContent>);

  public contentType = computed(() => {
    if (typeof this.content() === 'string') {
      return 'string';
    }

    if (this.content() instanceof TemplateRef) {
      return 'template';
    }

    return 'component';
  });
}
