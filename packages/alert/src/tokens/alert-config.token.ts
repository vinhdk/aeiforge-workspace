import { InjectionToken } from '@angular/core';
import type { IAlertConfig } from '../interfaces/alert-config.interface';

export const ALERT_CONFIG = new InjectionToken<IAlertConfig<unknown, unknown, unknown, true>>('ALERT_CONFIG');
