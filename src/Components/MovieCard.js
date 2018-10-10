import React, {Component} from 'react';
import '../Styles/MovieCard.css'
import Icon from 'antd/lib/icon'
import ReactStars from 'react-stars'
import APILayer from '../APIUtils/APILayer'


const imageUrlPrefix = 'https://image.tmdb.org/t/p/w500';

class MovieCard extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    genreTostring(genreList) {
        console.log(genreList.map((id)=>APILayer.getGenreName(id)));
        return APILayer.getGenreName(genreList[0])
    }

    render() {
        const {movie, deleteCallBack, editCallBack} = this.props;
        console.log('movie', movie);
        console.log(this.props);
        return (
            <div className='card'>
                <div className='imageContainer'>
                    <img width={'100%'}
                         height={'100%'}
                         src={`${imageUrlPrefix}${movie.poster_path}`}/>
                </div>
                <div className='cardDataContainer'>
                    <Icon className='deleteIcon' type="close-circle" theme="outlined"
                          onClick={() => deleteCallBack(movie)}/>
                    <div className='cardData'>
                        <div className='titleField'>
                            <p className='movieTitle'>{movie.title}</p>
                        </div>
                        <div className='field'>
                            <ReactStars className='reactStars'
                                        count={5}
                                        size={20}
                                        edit={false}
                                        value={movie.vote_average / 2}
                                        color2={'#ffd700'}/>
                            {movie.vote_average}
                        </div>
                        <div className='field'>
                            <p className='boldField'>Release: </p>
                            <p>{movie.release_date}</p>
                        </div>
                        <div className='field'>
                            <p className='boldField'>Genre: </p>
                            <p>{this.genreTostring(movie.genre_ids).toString()}</p>
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
}

export default MovieCard;
