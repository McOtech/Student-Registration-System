import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthToken } from './auth.reducer';

export interface AppState {
  authReducer: AuthToken;
}

export const reducers: ActionReducerMap<AppState> = {
  authReducer
};
