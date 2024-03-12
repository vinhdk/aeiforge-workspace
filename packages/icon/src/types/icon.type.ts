import { IconFilledCategories, IconOutlinedCategories } from '../enums/icon-category.enum';
import {
  IconFilledActionNames,
  IconFilledAlertNames,
  IconFilledAVNames,
  IconFilledCommunicationNames,
  IconFilledContentNames,
  IconFilledDeviceNames,
  IconFilledEditorNames,
  IconFilledFileNames,
  IconFilledHardwareNames,
  IconFilledHomeNames,
  IconFilledImageNames,
  IconFilledMapsNames,
  IconFilledNavigationNames,
  IconFilledNotificationNames,
  IconFilledPlacesNames,
  IconFilledSocialNames,
  IconFilledToggleNames
} from '../enums/icon-filled-name.enum';
import {
  IconOutlinedActionNames,
  IconOutlinedAlertNames,
  IconOutlinedAVNames,
  IconOutlinedCommunicationNames,
  IconOutlinedContentNames,
  IconOutlinedDeviceNames,
  IconOutlinedEditorNames,
  IconOutlinedFileNames,
  IconOutlinedHardwareNames,
  IconOutlinedHomeNames,
  IconOutlinedImageNames,
  IconOutlinedMapsNames,
  IconOutlinedNavigationNames,
  IconOutlinedNotificationNames,
  IconOutlinedPlacesNames,
  IconOutlinedSocialNames,
  IconOutlinedToggleNames
} from '../enums/icon-outlined-name.enum';

export type IconToString<TCategory extends string, TName extends string> = `${TCategory}-${TName}`;

export type IconPath =
  | IconToString<typeof IconFilledCategories.ACTION, (typeof IconFilledActionNames)[keyof typeof IconFilledActionNames]>
  | IconToString<typeof IconFilledCategories.ALERT, (typeof IconFilledAlertNames)[keyof typeof IconFilledAlertNames]>
  | IconToString<typeof IconFilledCategories.AV, (typeof IconFilledAVNames)[keyof typeof IconFilledAVNames]>
  | IconToString<typeof IconFilledCategories.COMMUNICATION, (typeof IconFilledCommunicationNames)[keyof typeof IconFilledCommunicationNames]>
  | IconToString<typeof IconFilledCategories.CONTENT, (typeof IconFilledContentNames)[keyof typeof IconFilledContentNames]>
  | IconToString<typeof IconFilledCategories.DEVICE, (typeof IconFilledDeviceNames)[keyof typeof IconFilledDeviceNames]>
  | IconToString<typeof IconFilledCategories.EDITOR, (typeof IconFilledEditorNames)[keyof typeof IconFilledEditorNames]>
  | IconToString<typeof IconFilledCategories.FILE, (typeof IconFilledFileNames)[keyof typeof IconFilledFileNames]>
  | IconToString<typeof IconFilledCategories.HARDWARE, (typeof IconFilledHardwareNames)[keyof typeof IconFilledHardwareNames]>
  | IconToString<typeof IconFilledCategories.HOME, (typeof IconFilledHomeNames)[keyof typeof IconFilledHomeNames]>
  | IconToString<typeof IconFilledCategories.IMAGE, (typeof IconFilledImageNames)[keyof typeof IconFilledImageNames]>
  | IconToString<typeof IconFilledCategories.MAPS, (typeof IconFilledMapsNames)[keyof typeof IconFilledMapsNames]>
  | IconToString<typeof IconFilledCategories.NAVIGATION, (typeof IconFilledNavigationNames)[keyof typeof IconFilledNavigationNames]>
  | IconToString<typeof IconFilledCategories.NOTIFICATION, (typeof IconFilledNotificationNames)[keyof typeof IconFilledNotificationNames]>
  | IconToString<typeof IconFilledCategories.PLACES, (typeof IconFilledPlacesNames)[keyof typeof IconFilledPlacesNames]>
  | IconToString<typeof IconFilledCategories.SOCIAL, (typeof IconFilledSocialNames)[keyof typeof IconFilledSocialNames]>
  | IconToString<typeof IconFilledCategories.TOGGLE, (typeof IconFilledToggleNames)[keyof typeof IconFilledToggleNames]>

  | IconToString<typeof IconOutlinedCategories.ACTION, (typeof IconOutlinedActionNames)[keyof typeof IconOutlinedActionNames]>
  | IconToString<typeof IconOutlinedCategories.ALERT, (typeof IconOutlinedAlertNames)[keyof typeof IconOutlinedAlertNames]>
  | IconToString<typeof IconOutlinedCategories.AV, (typeof IconOutlinedAVNames)[keyof typeof IconOutlinedAVNames]>
  | IconToString<typeof IconOutlinedCategories.COMMUNICATION, (typeof IconOutlinedCommunicationNames)[keyof typeof IconOutlinedCommunicationNames]>
  | IconToString<typeof IconOutlinedCategories.CONTENT, (typeof IconOutlinedContentNames)[keyof typeof IconOutlinedContentNames]>
  | IconToString<typeof IconOutlinedCategories.DEVICE, (typeof IconOutlinedDeviceNames)[keyof typeof IconOutlinedDeviceNames]>
  | IconToString<typeof IconOutlinedCategories.EDITOR, (typeof IconOutlinedEditorNames)[keyof typeof IconOutlinedEditorNames]>
  | IconToString<typeof IconOutlinedCategories.FILE, (typeof IconOutlinedFileNames)[keyof typeof IconOutlinedFileNames]>
  | IconToString<typeof IconOutlinedCategories.HARDWARE, (typeof IconOutlinedHardwareNames)[keyof typeof IconOutlinedHardwareNames]>
  | IconToString<typeof IconOutlinedCategories.HOME, (typeof IconOutlinedHomeNames)[keyof typeof IconOutlinedHomeNames]>
  | IconToString<typeof IconOutlinedCategories.IMAGE, (typeof IconOutlinedImageNames)[keyof typeof IconOutlinedImageNames]>
  | IconToString<typeof IconOutlinedCategories.MAPS, (typeof IconOutlinedMapsNames)[keyof typeof IconOutlinedMapsNames]>
  | IconToString<typeof IconOutlinedCategories.NAVIGATION, (typeof IconOutlinedNavigationNames)[keyof typeof IconOutlinedNavigationNames]>
  | IconToString<typeof IconOutlinedCategories.NOTIFICATION, (typeof IconOutlinedNotificationNames)[keyof typeof IconOutlinedNotificationNames]>
  | IconToString<typeof IconOutlinedCategories.PLACES, (typeof IconOutlinedPlacesNames)[keyof typeof IconOutlinedPlacesNames]>
  | IconToString<typeof IconOutlinedCategories.SOCIAL, (typeof IconOutlinedSocialNames)[keyof typeof IconOutlinedSocialNames]>
  | IconToString<typeof IconOutlinedCategories.TOGGLE, (typeof IconOutlinedToggleNames)[keyof typeof IconOutlinedToggleNames]>
