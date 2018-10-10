import React, {Component} from 'react';
import MovieCard from "./MovieCard";
import '../Styles/MovieList.css'
import Responsive from 'react-responsive';
import APILayer from "../APIUtils/APILayer";
import Icon from "antd/es/icon/index";
import DeletePopUp from "./DeletePopUp";
import {Modal} from 'antd';
import "antd/dist/antd.css";


const MobileSize = props => <Responsive {...props} maxWidth={840}/>;
const MidSize = props => <Responsive {...props} minWidth={840} maxWidth={1200}/>;
const LargeSize = props => <Responsive {...props} minWidth={1200}/>;

const confirm = Modal.confirm;

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesList: undefined,
            isOpen: false
        }

    }

    deleteMovie = (movie) => {
        const movieIndex = this.state.moviesList.indexOf(movie);
        console.log('movie index ', movieIndex);
        if (movieIndex > -1) {
            let newList = this.state.moviesList;
            newList.splice(movieIndex, 1);
            this.setState({
                moviesList: newList
            });
        }
    };

    editMovie() {
        console.log('aaaaaa');
    }

    componentDidMount() {
        APILayer.getMovies()
            .then((moviesList) => {
                console.log('the list', moviesList);
                this.setState({
                    moviesList: moviesList
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    renderList(columns, column) {
        return this.state.moviesList.map((movie, i) => {
                if (i % columns === column) {
                    return (
                        <MovieCard
                            deleteCallBack={this.deleteMovie}
                            editCallBack={this.editMovie}
                            movie={movie}
                            key={movie.id}/>)
                }
            }
        )

    }

    render() {
        if (this.state.moviesList) {
            return (
                <div>
                    <LargeSize>
                        <div className='ListsContainer'>
                            <div className='MovieList'>
                                {this.renderList(3, 0)}
                            </div>
                            <div className='MovieList'>
                                {this.renderList(3, 1)}
                            </div>
                            <div className='MovieList'>
                                {this.renderList(3, 2)}
                            </div>
                        </div>
                    </LargeSize>

                    <MidSize>
                        <div className='ListsContainer'>
                            <div className='MovieList'>
                                {this.renderList(2, 0)}
                            </div>
                            <div className='MovieList'>
                                {this.renderList(2, 1)}
                            </div>
                        </div>
                    </MidSize>

                    <MobileSize className='MobileSize'>
                        <div className='ListsContainer'>
                            <div className='MovieList'>
                                {this.renderList(1, 0)}
                            </div>
                        </div>

                    </MobileSize>
                    <div>
                        <Icon className='addButton' type="plus-circle" theme="outlined"/>
                    </div>
                </div>

            );
        }
        else {
            return null;
        }
    }

}

export default MovieList;
