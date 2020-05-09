import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';

import App from './app/app';

// import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import TasksService from './app/services/tasks.service';
import AuthService from './app/services/auth.service';
import TasksStore from './app/stores/tasks.store';
import UserStore from './app/stores/users.store';

// import { TASKS_FEATURE_KEY, tasksReducer } from './app/tasks.slice';

// const store = configureStore({
//   reducer: { [TASKS_FEATURE_KEY]: tasksReducer }
// });

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

const services: any = {};
const stores: any = {
  routerStore: new RouterStore()
};

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, stores.routerStore);

services.tasksService = new TasksService(stores.routerStore);
services.authService = new AuthService(stores.routerStore);

stores.tasksStore = new TasksStore(services.tasksService);
stores.userStore = new UserStore(services.authService);

// class RootStore {
//   tasksStore: TasksStore;
//   userStore: UserStore;
  
//   constructor() {
//     this.tasksStore = new TasksStore(services.tasksService);
//     this.userStore = new UserStore(services.authService);
//   }
// }

const Root = (
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
ReactDOM.render(Root, document.getElementById('root'));

