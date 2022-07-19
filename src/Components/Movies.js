import React, { Component } from 'react'
import axios from 'axios'

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            par: [1],
            curr: 1,
            movies: [],
            favs: []
        }
    }
    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=70b604161170dce2d21e45af1f863335&language=en-US&page=${this.state.curr}`);
        let data = res.data;
        this.setState({
            movies: [...data.results]
        })
        let movie_data = JSON.parse(localStorage.getItem("movies") || "[]");
        let temp = movie_data.map( (m) => m.id );
        this.setState({
            favs: [...temp]
        })

    }
    handle = (value) => {
        if( this.state.curr === value ) return;
        this.setState({
            curr: value
        }, this.componentDidMount)
    }
    handleLeft = () => {
        if( this.state.par.length === 1 ) return;
        let temp = [];
        for (let i = 1; i <= this.state.par.length - 1; i++) {
            temp.push(i);
        }
        this.setState({
            par: [...temp],
            curr: this.state.curr-1
        }, this.componentDidMount)
    }
    handleRight = () => {
        let temp = [];
        for (let i = 1; i <= this.state.par.length + 1; i++) {
            temp.push(i);
        }
        this.setState({
            par: [...temp],
            curr: this.state.curr+1
        }, this.componentDidMount)
    }
    handleFav = (movie) => {
        let data = JSON.parse(localStorage.getItem("movies") || "[]");
        if( this.state.favs.includes(movie.id) ) {
            data = data.filter( (m) => m.id !== movie.id );
        }else {
            data.push( movie );
        }
        localStorage.setItem( "movies", JSON.stringify( data ) );
        let temp = data.map( (m) => m.id );
        this.setState({
            favs: [...temp]
        })
    }
    render() {
        return (
            <>
                {
                    this.state.movies.length === 0 ?
                        <div className='loader'>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> :
                        <div>
                            <h3 className='text-center'><strong>Trending</strong></h3>
                            <div className='movies-list'>
                                {
                                    this.state.movies.map((m) => (
                                        <div class="card movie-card" onMouseEnter={() => this.setState({ hover: m.id })} onMouseLeave={() => this.setState({ hover: '' })}>
                                            <img src={`https://image.tmdb.org/t/p/original${m.backdrop_path}`} alt={m.title} className="card-img-top movie-img" />
                                            <h4 className="card-title movie-title">{m.original_title}</h4>
                                            <div className='button-wrapper'>
                                                {
                                                    this.state.hover === m.id &&
                                                    <a className="btn btn-primary movie-button" onClick={() => this.handleFav(m)}>{this.state.favs.includes(m.id) ? "Remove from Favorites" : "Add to Favorites"}</a>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='page-button'>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                                        {
                                            this.state.par.map((value) => (
                                                <li className="page-item"><a className="page-link" onClick={() => this.handle(value)}>{value}</a></li>
                                            ))
                                        }
                                        <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                }
            </>
        )
    }
}
