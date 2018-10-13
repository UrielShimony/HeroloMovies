import React, {Component} from 'react';

import Movies from './Movies';

import logo from '../Assets/HeroloLogo.png';
import '../Styles/MovieApp.css';


class App extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <Movies/>
            </div>
        );
    }
}

export default App;
