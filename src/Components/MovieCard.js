import React, {Component} from 'react';
import '../Styles/MovieCard.css'
import Icon from 'antd/lib/icon'
import APILayer from '../APIUtils/APILayer'
import {Rate} from "antd";


const imageUrlPrefix = 'https://image.tmdb.org/t/p/w500';

class MovieCard extends Component {

    render() {
        const {movie, deleteCallBack, editCallBack} = this.props;
        return (
            <div className='card'>
                <div className='imageContainer'>
                    <img src={`${imageUrlPrefix}${movie.poster_path}`}/>
                </div>
                <div className='cardDataContainer'>
                    <Icon className='deleteIcon' type="close-circle" theme="outlined"
                          onClick={() => deleteCallBack(movie)}/>
                    <div className='cardData'>
                        <div className='titleField'>
                            <p className='movieTitle'>{movie.title}</p>
                        </div>
                        <div className='field'>
                            <Rate className='reactStars'
                                  allowHalf
                                   disabled
                                   value={Math.round(movie.vote_average)/2} />
                            {movie.vote_average}
                        </div>
                        <div className='field'>
                            <p className='boldField'>Release: </p>
                            <p>{movie.release_date}</p>
                        </div>
                        <div className='field'>
                            <p className='boldField'>Genre: </p>
                            <p className='genreDetails'>{this.genreTostring(movie.genre_ids).toString()}</p>
                        </div>
                    </div>
                    <div className='cardEditField'>
                        <p className='idField'>
                            ID: {movie.id}
                        </p>
                        <button className='editButton' onClick={() => editCallBack(movie)}>Edit</button>
                    </div>
                </div>
            </div>
        );
    }
    genreTostring(genreList) {
        return (genreList.map((id)=>APILayer.getGenreName(id)))
            .toString().replace(/,/g, ', ');
    }
}

export default MovieCard;
