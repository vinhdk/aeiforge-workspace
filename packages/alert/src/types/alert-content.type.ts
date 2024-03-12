import { ComponentType } from '@angular/cdk/overlay';
import { TemplateRef } from '@angular/core';

export type AlertContent<TContent> = ComponentType<TContent> | TemplateRef<TContent> | string;
