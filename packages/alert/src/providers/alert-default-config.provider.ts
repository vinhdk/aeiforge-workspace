import type { StaticProvider } from '@angular/core';
import { ALERT_CONFIG } from '../tokens/alert-config.token';
import type { IAlertConfig } from '../interfaces/alert-config.interface';
import type { AlertStates } from '../enums/alert-state.enum';
import type { AlertContent } from '../types/alert-content.type';
import { AlertHorizontalPositions, AlertVerticalPositions } from '../enums/alert-position.enum';
import { provideAlertIcon } from './alert-icon.provider';

export function provideAlertDefaultConfig<TContent, TFooter, TData>(
  state: AlertStates,
  content: AlertContent<TContent> = '',
  config?: Partial<Omit<IAlertConfig<TContent, TFooter, TData, true>, 'content' | 'state'>>
): {
  provider: StaticProvider,
  config: IAlertConfig<TContent, TFooter, TData>
} {
  const defaultConfig = {
    ...(config || {}),
    state,
    content,
    title: config?.title ?? '',
    footer: config?.footer ?? '',
    options: {
      horizontalPosition: AlertHorizontalPositions.RIGHT,
      verticalPosition: AlertVerticalPositions.TOP,
      horizontalOffset: '8px',
      verticalOffset: '8px',
      hiddenCloseIcon: false,
      duration: 2000,
      icon: provideAlertIcon(state),
      ...(config?.options || {})
    }
  };

  return {
    provider: {
      provide: ALERT_CONFIG,
      useValue: defaultConfig
    },
    config: defaultConfig
  };
}
