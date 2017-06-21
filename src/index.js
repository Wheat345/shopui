import React from 'react';
import { render } from 'react-dom';
import Menu from './menu.js';

import { createStore, applyMiddleware,combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import {IntlProvider, addLocaleData} from 'react-intl';
import reducers from './reducers';

import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import zh from 'react-intl/locale-data/zh';
import ReduxConnectedIntlProvider from './reduxConnectedIntlProvider';

const createStoreWithMiddleware = applyMiddleware()(createStore);

const store = createStoreWithMiddleware(reducers);

addLocaleData([...en, ...zh, ...fr]);
render(
    <Provider store={store}>
      <ReduxConnectedIntlProvider>
      <Menu />
      </ReduxConnectedIntlProvider>
    </Provider>,
    document.getElementById('App')
);
