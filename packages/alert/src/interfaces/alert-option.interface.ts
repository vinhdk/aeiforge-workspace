import { IconPath } from '@aeiforge-workspace/icon';
import { AlertHorizontalPositions, AlertVerticalPositions } from '../enums/alert-position.enum';

export interface IAlertOption {
  horizontalPosition: AlertHorizontalPositions;
  verticalPosition: AlertVerticalPositions;
  horizontalOffset: string;
  verticalOffset: string;
  icon: IconPath;
  hiddenCloseIcon: boolean;
  duration: number;
}
