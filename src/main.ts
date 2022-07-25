import Aurelia from 'aurelia';
import { StoreConfiguration } from '@aurelia/store-v1';
import { RouterConfiguration } from '@aurelia/router'; 
import { MyApp } from './my-app';
import { initialState } from './types';

Aurelia
    .register(
        StoreConfiguration.withInitialState(initialState).withOptions({ history: { undoable: true, limit: 20 } })
    )
    .register(RouterConfiguration)
    .app(MyApp)
    .start();
