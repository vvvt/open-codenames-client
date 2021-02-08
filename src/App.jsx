import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Game from './components/game';
import EnterForm from './components/enterForm';
import { SocketContext, socket } from './context/socket';

import './App.css';

const App = () => {
    return (
        <SocketContext.Provider value={socket}>
            <Switch>
                <Route path='/game/:room' component={Game}></Route>
                <Route path='/' exact component={EnterForm}></Route>
                <Redirect to='/' />
            </Switch>
        </SocketContext.Provider>
    );
};

export default App;
