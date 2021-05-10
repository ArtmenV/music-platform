import {createStore, AnyAction, Store} from 'redux';
import {createWrapper, Context, HYDRATE, MakeStore} from 'next-redux-wrapper';
import { reducer, RootState } from './reducers';

const makeStore: MakeStore<RootState> = (context: Context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore, {debug: true});