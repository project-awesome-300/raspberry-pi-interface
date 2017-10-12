import { animate, state, style, transition, trigger } from '@angular/animations';


export const flipAnimation = trigger('flipState', [
    state('active', style({
      transform: 'rotateY(179.9deg)'
    })),
    state('inactive', style({
      transform: 'rotateY(0)'
    })),
    transition('active => inactive', animate('250ms ease-out')),
    transition('inactive => active', animate('250ms ease-in'))
  ])  