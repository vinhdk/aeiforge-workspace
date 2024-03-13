import { Observable } from 'rxjs';

export interface IAlertRef {
  afterClosed: Observable<unknown>;
  afterOpened: Observable<unknown>;
  closeClicked: Observable<unknown>;
  close(): void;
}
