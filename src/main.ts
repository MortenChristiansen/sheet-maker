import Aurelia from 'aurelia';
import { DialogDefaultConfiguration } from '@aurelia/runtime-html';
import { StoreConfiguration } from '@aurelia/store-v1';
import { Navigation, RouterConfiguration, RoutingInstruction } from '@aurelia/router'; 
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
import { AddItemInput } from './components/add-item-input';
import { DialogBox } from './components/dialog-box';
import { TextDialog } from './components/text-dialog';
import { StatInfoButton } from './components/stat-info-button';
import { CrossButton } from './components/cross-button';
import { globalCharacterInfo } from './actions/sheetActions';

let app = Aurelia
    .register(
        StoreConfiguration.withInitialState(initialState).withOptions({ history: { undoable: true, limit: 20 } })
    )
    .register(RouterConfiguration.customize({ title: {
        transformTitle: (title: string, instruction: RoutingInstruction, navigation: Navigation) => {
            
            if (globalCharacterInfo.name) {
                return `${globalCharacterInfo.name} - ${title}`;
            }

            return title;
          },
          appTitle: '${componentTitles}${appTitleSeparator}Sheet Maker'
    } }))
    .register(DialogDefaultConfiguration)
    .register( // Components
        Checkbox,
        List,
        PrimaryStat,
        RadioButton,
        TextBox,
        TextField,
        AddItemInput,
        DialogBox,
        TextDialog,
        StatInfoButton,
        CrossButton)
    .register( // Layout elements
        Footer,
        Title,
        RuneEdge,
        PageHeader)
    .app(MyApp);

export const container = app.container;

app.start();


window.addEventListener("dragover", function(e) {
    e.preventDefault();
}, false);

window.addEventListener("drop", function(e) {
    e.preventDefault();
}, false);

const isLocal = window.location.href.indexOf("localhost") >= 0;

if (!isLocal && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sheet-maker/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
  });
}