import { setupStore } from 'shared/store';
import React from 'react';
import { Provider } from 'react-redux';

export const withStore = (component: () => React.ReactNode) => () =>
   <Provider store={setupStore()}>{component()}</Provider>;
