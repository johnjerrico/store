import { Action } from './action';

export interface ActionReducer<T> {
  (state: T, action: Action):T;
}
