import React, {Component} from 'react';
import APILayer from "../APIUtils/APILayer";

import MovieList from './MovieList';

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
                <MovieList/>
            </div>
        );
    }
}

export default App;
