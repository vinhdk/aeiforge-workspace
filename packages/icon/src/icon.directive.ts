import { computed, Directive, input } from '@angular/core';
import { IconPath } from './types/icon.type';

@Directive({
  selector: 'i[aeIcon]',
  standalone: true,
  host: {
    '[class]': 'className()',
    '[style.fontSize]': 'size()'
  }
})
export class IconDirective {
  public path = input.required<`${IconPath}`>({
    alias: 'aeIcon',
  });

  public size = input<string>('24px')

  public className = computed(() => `ae-${this.path()}`);
}
