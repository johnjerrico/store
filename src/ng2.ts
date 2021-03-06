import { OpaqueToken, NgModule } from 'ng-metadata/core';
import { Reducer } from './reducer';
import { Dispatcher } from './dispatcher';
import { Store } from './store';
import { State } from './state';
import { combineReducers } from './utils';

export const INITIAL_REDUCER = new OpaqueToken('Token ngrx/store/reducer');
export const INITIAL_STATE = new OpaqueToken('Token ngrx/store/initial-state');

export const _INITIAL_REDUCER = new OpaqueToken('Token _ngrx/store/reducer');
export const _INITIAL_STATE = new OpaqueToken('Token _ngrx/store/initial-state');

export function _initialReducerFactory(reducer) {
  if (typeof reducer === 'function') {
    return reducer;
  }
  return combineReducers(reducer);
}

export function _initialStateFactory(initialState, reducer) {
  if (Object.keys(initialState).length === 0) {
    return reducer({}, { type: Dispatcher.INIT });
  }
  return initialState;
}

export function _storeFactory(dispatcher, reducer, state$) {
  return new Store(dispatcher, reducer, state$);
}

export function _stateFactory(initialState: any, dispatcher: Dispatcher, reducer: Reducer) {
  return new State(initialState, dispatcher, reducer);
}

export function _reducerFactory(dispatcher, reducer) {
  return new Reducer(dispatcher, reducer);
}

export function _dispatcherFactory() {
  return new Dispatcher();
}

/**
 * @deprecated, use StoreModule.provideStore instead!
 */
export function provideStore(_reducer: any, _initialState?: any): any[] {
  return [
    { provide: Dispatcher, useFactory: _dispatcherFactory },
    { provide: Store, useFactory: _storeFactory, deps: [Dispatcher, Reducer, State] },
    { provide: Reducer, useFactory: _reducerFactory, deps: [Dispatcher, INITIAL_REDUCER] },
    { provide: State, useFactory: _stateFactory, deps: [INITIAL_STATE, Dispatcher, Reducer] },
    { provide: INITIAL_REDUCER, useFactory: _initialReducerFactory, deps: [_INITIAL_REDUCER] },
    { provide: INITIAL_STATE, useFactory: _initialStateFactory, deps: [_INITIAL_STATE, INITIAL_REDUCER] },
    { provide: _INITIAL_STATE, useValue: _initialState === undefined ? {} : _initialState },
    { provide: _INITIAL_REDUCER, useValue: _reducer }
  ];
}

export class StoreModule {
  static provideStore(reducer: any, initialState?: any): any[] {
    return provideStore(reducer, initialState);
  }
}
