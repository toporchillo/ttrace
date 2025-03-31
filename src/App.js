import React from 'react';
import './App.css';
import Layout from './components/Layout'
import Starters from './components/Starters'

function App() {
  return (
    <div className="App">
      <Layout>
        <Starters />
      </Layout>
    </div>
  );
}

export default App;
