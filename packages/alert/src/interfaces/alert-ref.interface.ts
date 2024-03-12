import { Observable } from 'rxjs';

export interface IAlertRef {
  afterClosed: Observable<unknown>;
  afterOpened: Observable<unknown>;
  closed: Observable<unknown>;
  opened: Observable<unknown>;
  closeClicked: Observable<unknown>;
  close(): void;
}
