import React, {Component} from 'react';
import MovieCard from "./MovieCard";
import '../Styles/MovieList.css'
import Responsive from 'react-responsive';
import APILayer from "../APIUtils/APILayer";
import "antd/dist/antd.css";
import EditPopUp from "./EditPopUp";
import {Icon, Modal} from "antd";
import * as moment from "moment";


const MobileSize = props => <Responsive {...props} maxWidth={840}/>;
const MidSize = props => <Responsive {...props} minWidth={840} maxWidth={1200}/>;
const LargeSize = props => <Responsive {...props} minWidth={1200}/>;

class Movies extends Component {
    constructor(props) {
        super(props);
        this.idCounter = 0; //Just for new movies will not throw err
        this.state = {
            moviesList: undefined,
            showDeletePopUp: false,
            movieToRemove: {},
            showEditPopUp: false,
            editPopUpTitle: '',
            movieToEdit: undefined,
            saveFunction: {},
        }


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

    render() {
        if (this.state.moviesList) {
            const list1A = this.renderList(3, 0);
            const list1B = this.renderList(3, 1);
            const list1C = this.renderList(3, 2);
            const list2A = this.renderList(2, 0);
            const list2B = this.renderList(2, 1);
            const list3 = this.renderList(1, 0);
            return (
                <div>
                    <Icon className='addIcon'
                          type="plus-circle"
                          theme="outlined"
                          onClick={this.popUpNewMovie}/>
                    <LargeSize>
                        <div className='ListsContainer'>
                            <div className='MovieList'>
                                {list1A}
                            </div>
                            <div className='MovieList'>
                                {list1B}
                            </div>
                            <div className='MovieList'>
                                {list1C}
                            </div>
                        </div>
                    </LargeSize>

                    <MidSize>
                        <div className='ListsContainer'>
                            <div className='MovieList'>
                                {list2A}
                            </div>
                            <div className='MovieList'>
                                {list2B}
                            </div>
                        </div>
                    </MidSize>

                    <MobileSize className='MobileSize'>
                        <div className='ListsContainer'>
                            <div className='MovieList'>
                                {list3}
                            </div>
                        </div>

                    </MobileSize>
                    <Modal
                        title="DeletMovie"
                        visible={this.state.showDeletePopUp}
                        onOk={this.deleteMovie}
                        onCancel={() => this.setState({showDeletePopUp: false})}
                        okText="delete"
                        okButtonProps={{type: "danger"}}
                        cancelText="cancel"
                    >
                        <p>
                            Are you sure you want to delete this movie?
                        </p>
                    </Modal>
                    <EditPopUp
                        movieTitle={this.state.editPopUpTitle}
                        visible={this.state.showEditPopUp}
                        movie={this.state.movieToEdit}
                        closeFunction={this.closeEditPopUp}
                        saveEdit={this.state.saveFunction}/>
                    <div>
                    </div>
                </div>

            );
        }
        else {
            return null;
        }
    }

    renderList(columns, column) {
        return this.state.moviesList.map((movie, i) => {
                if (i % columns === column) {
                    return (
                        <MovieCard
                            deleteCallBack={this.triggerDelete}
                            editCallBack={this.editMovie}
                            movie={movie}
                            key={movie.id}/>)
                }
                return null
            }
        )
    }


    addNewMovie = (newMovie) => {

        const newList = this.state.moviesList.concat([newMovie]);
        this.idCounter++;
        this.setState({
            moviesList: newList
        });
    }
    popUpNewMovie = () => {
        const newMovie = {
            genre_ids: [],
            id: this.idCounter,
            poster_path: "",
            release_date: moment(moment(), 'YYYY-MM-DD'),
            title: "",
            vote_average: 0,
        };
        this.setState({
            movieToEdit: newMovie,
            showEditPopUp: true,
            editPopUpTitle: 'New Movie',
            saveFunction: this.addNewMovie
        })
    }

    triggerDelete = (movie) => {
        this.setState({
            movieToRemove: movie,
            showDeletePopUp: true
        })
    };
    deleteMovie = () => {
        const {movieToRemove} = this.state;
        const movieIndex = this.state.moviesList.indexOf(movieToRemove);
        if (movieIndex > -1) {
            let newList = this.state.moviesList;
            newList.splice(movieIndex, 1);
            this.setState({
                moviesList: newList
            });
        }
        //For the validation of titles
        APILayer.removMovie(movieToRemove);

        this.setState({showDeletePopUp: false})
    };

    editMovie = (movie) => {
        this.setState({
            movieToEdit: movie,
            showEditPopUp: true,
            editPopUpTitle: 'Edit Movie: ' + movie.title,
            saveFunction: this.saveEditFunction
        });
    };

    closeEditPopUp = () => {
        this.setState({
            showEditPopUp: false,
            movieToEdit: undefined,
            editPopUpTitle: ''
        })
    };

    saveEditFunction = (newMovie) => {
        const newList = this.state.moviesList.map(
            (movie) => {
                if (movie.id === newMovie.id) {
                    return newMovie;
                } else {
                    return movie;
                }
            });
        this.setState({
            moviesList: newList
        });

    };


}

export default Movies;
