import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import configureStore from './store/reducers/store';
import App from './App';

import Amplify from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);

const store = configureStore();

const ReduxApp = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(ReduxApp);
