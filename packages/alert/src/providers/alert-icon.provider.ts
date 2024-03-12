import { IconPath } from "@aeiforge-workspace/icon";
import { AlertStates } from '../enums/alert-state.enum';

export function provideAlertIcon(state: AlertStates, customIcon?: IconPath): IconPath {
  if (customIcon) {
    return customIcon;
  }

  switch (state) {
    case AlertStates.ERROR:
      return 'filled-content-report';
    case AlertStates.SUCCESS:
      return 'outlined-action-check_circle';
    case AlertStates.WARNING:
      return 'outlined-alert-warning_amber';
    default:
      return 'outlined-action-info';
  }
}
