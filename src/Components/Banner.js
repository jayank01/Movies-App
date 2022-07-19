import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { movies } from './getMovies'

export default class Banner extends Component {
    render() {
        let movie1 = movies.results[2];
        let movie2 = movies.results[12];
        let movie3 = movies.results[3];
        let movie4 = movies.results[7];
        let movie5 = movies.results[5];
        return (
            <>
                {
                    movie1 === ' ' ?
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <Carousel showArrows={true} infiniteLoop={true} interval={3000} autoPlay={true} showThumbs={false}>
                            <div>
                                <img src={`https://image.tmdb.org/t/p/original${movie1.backdrop_path}`} alt={movie1.title} className="card-img-top banner-img" />
                                <div className="card-title movie-name">
                                    <h2 className="card-title banner-title">{movie1.original_title}</h2>
                                </div>
                            </div>
                            <div>
                                <img src={`https://image.tmdb.org/t/p/original${movie2.backdrop_path}`} alt={movie2.title} className="card-img-top banner-img" />
                                <div className="card-title movie-name">
                                    <h2 className="card-title banner-title">{movie2.original_title}</h2>
                                </div>
                            </div>
                            <div>
                                <img src={`https://image.tmdb.org/t/p/original${movie3.backdrop_path}`} alt={movie3.title} className="card-img-top banner-img" />
                                <div className="card-title movie-name">
                                    <h2 className="card-title banner-title">{movie3.original_title}</h2>
                                </div>
                            </div>
                            <div>
                                <img src={`https://image.tmdb.org/t/p/original${movie4.backdrop_path}`} alt={movie4.title} className="card-img-top banner-img" />
                                <div className="card-title movie-name">
                                    <h2 className="card-title banner-title">{movie4.original_title}</h2>
                                </div>
                            </div>
                            <div>
                                <img src={`https://image.tmdb.org/t/p/original${movie5.backdrop_path}`} alt={movie5.title} className="card-img-top banner-img" />
                                <div className="card-title movie-name">
                                    <h2 className="card-title banner-title">{movie5.original_title}</h2>
                                </div>
                            </div>
                        </Carousel>
                }
            </>
        )
    }
}
