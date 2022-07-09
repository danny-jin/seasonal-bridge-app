import React from 'react';

import ConnectWallet from './views/connectWallet';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="flex justify-between">
        <ConnectWallet></ConnectWallet>
      </div>
    </div>
  );
}

export default App;
