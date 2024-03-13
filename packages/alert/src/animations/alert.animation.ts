import { animate, style, transition, trigger } from '@angular/animations';

const TRANSITION = '{{duration}}ms ease-in-out';
const DURATION = { params: { duration: 300 } };
export const fadeIn = trigger('fadeIn', [
  transition(
    ':enter',
    [style({ opacity: 0 }), animate(TRANSITION, style({ opacity: 1 }))],
    DURATION
  ),
  transition(
    ':leave',
    [style({ opacity: 1 }), animate(TRANSITION, style({ opacity: 0 }))],
    DURATION
  )
]);

export const slideIn = trigger('slideIn', [
  transition(
    '* => left',
    [
      style({ transform: 'translateX(-100%)' }),
      animate(TRANSITION, style({ transform: 'translateX(0)' }))
    ],
    DURATION
  ),
  transition(
    'left => *',
    [
      style({ transform: 'translateX(0)' }),
      animate(TRANSITION, style({ transform: 'translateX(-100%)' }))
    ],
    DURATION
  ),
  transition(
    '* => right',
    [
      style({ transform: 'translateX(100%)' }),
      animate(TRANSITION, style({ transform: 'translateX(0)' }))
    ],
    DURATION
  ),
  transition(
    'right => *',
    [
      style({ transform: 'translateX(0)' }),
      animate(TRANSITION, style({ transform: 'translateX(100%)' }))
    ],
    DURATION
  )
]);

export const heightCollapse = trigger('heightCollapse', [
  transition(
    ':enter',
    [style({ height: 0 }), animate(TRANSITION, style({ height: '*' }))],
    DURATION
  ),
  transition(
    ':leave',
    [style({ height: '*' }), animate(TRANSITION, style({ height: 0 }))],
    DURATION
  )
]);
