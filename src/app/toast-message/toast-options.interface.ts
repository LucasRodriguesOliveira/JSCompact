import { EToastPosition } from './toast-position.enum';

export interface IToastOptions {
  title: string;
  position: EToastPosition;
  // in milliseconds
  duration: number;
  isClosable: boolean;
  isFocusable: boolean;
};
