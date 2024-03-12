import { IAlertOption } from './alert-option.interface';
import { AlertContent } from '../types/alert-content.type';
import { AlertStates } from '../enums/alert-state.enum';

export interface IAlertConfig<TContent, TFooter, TData, TPartial extends boolean = false> {
  state: AlertStates;
  title: string;
  content: AlertContent<TContent>;
  footer: AlertContent<TFooter>;
  options: TPartial extends false ? IAlertOption : Partial<IAlertOption>;
  data?: TData;
}
