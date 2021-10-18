import React from 'react';
import './style.css';

import CenteredContainerView from './components/CenteredContainerView';
import TaxView from './components/TaxView';

export default function App() {
  return (
    <CenteredContainerView>
      <TaxView />
    </CenteredContainerView>
  );
}
