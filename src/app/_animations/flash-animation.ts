import { animate, state, style, transition, trigger } from '@angular/animations';


export const flashAnimation = trigger(
    'flash',
    [
        state('shown' , style({ opacity: 1 })), 
        state('hidden', style({ opacity: 0 })),
        transition('* => *', animate('.5s'))
      ]
)