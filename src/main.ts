import Aurelia from 'aurelia';
import { StoreConfiguration } from '@aurelia/store-v1';
import { RouterConfiguration } from '@aurelia/router'; 
import { MyApp } from './my-app';
import { initialState } from './types';
import { Checkbox } from './components/checkbox';
import { List } from './components/list';
import { PrimaryStat } from './components/primary-stat';
import { RadioButton } from './components/radio-button';
import { TextBox } from './components/text-box';
import { Footer } from './layout/footer';
import { Title } from './layout/title';
import { RuneEdge } from './layout/rune-edge';
import { PageHeader } from './layout/page-header';
import { TextField } from './components/text-field';

Aurelia
    .register(
        StoreConfiguration.withInitialState(initialState).withOptions({ history: { undoable: true, limit: 20 } })
    )
    .register(RouterConfiguration.customize({  }))
    .register(Checkbox, List, PrimaryStat, RadioButton, TextBox, TextField) // Components
    .register(Footer, Title, RuneEdge, PageHeader) // Layout elements
    .app(MyApp)
    .start();


window.addEventListener("dragover", function(e) {
    e.preventDefault();
}, false);

window.addEventListener("drop", function(e) {
    e.preventDefault();
}, false);

const isLocal = window.location.href.indexOf('localhost') >= 0;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register(isLocal ? '/service-worker.js' : '/sheet-maker/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
  });
}