import { Action } from './action';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Injectable } from 'ng-metadata/core';

@Injectable()
export class Dispatcher extends BehaviorSubject<Action> {
  static INIT = '@ngrx/store/init';

  constructor() {
    super({ type: Dispatcher.INIT });
  }

  dispatch(action: Action): void {
    this.next(action);
  }

  complete() {
    // noop
  }
}
