import React, { Component } from 'react';
import List from './containers/List/List'
import Detail from './containers/Detail/Detail'
import Header from './components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Header />
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={List} />
              <Route path={'/details/:id'} exact component={Detail} />
            </Switch>
          </BrowserRouter>
        </div>
      
    );
  }
}

export default App;