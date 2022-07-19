import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Fav extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currGen: "All Genres",
            movie: [],
            currText: '',
            sortCnt: 0,
            limit: 5,
            currPage: 1
        }
    }
    componentDidMount() {
        const genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let data = JSON.parse(localStorage.getItem("movies") || "[]");
        let temp = [];
        temp.push("All Genres");
        data.forEach((m) => {
            if (!temp.includes(genreids[m.genre_ids[0]])) {
                temp.push(genreids[m.genre_ids[0]]);
            }
        })
        this.setState({
            genres: [...temp],
            movie: [...data]
        })
    }
    handleGenre = (genre) => {
        this.setState({
            currGen: genre
        })
    }
    handlePage = (page) => {
        this.setState({
            currPage: page
        })
    }
    sortRating = () => {
        this.setState({
            sortCnt: this.state.sortCnt + 1
        })
        let temp = this.state.movie;
        if (this.state.sortCnt % 2 === 0) {
            temp.sort(function (m1, m2) {
                return m2.vote_average - m1.vote_average;
            })
        }else {
            temp.sort(function (m1, m2) {
                return m1.vote_average - m2.vote_average;
            })
        }
        this.setState({
            movie: [...temp]
        })
    }
    deleteMovie= (movie) => {
        let data = JSON.parse(localStorage.getItem("movies"));
        data = data.filter( (m) => m.id !== movie.id );
        localStorage.setItem( "movies" , JSON.stringify(data) ); 
        this.componentDidMount();
    }
    render() {
        const genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let filterarr = this.state.movie;
        if (this.state.currText !== '') {
            filterarr = this.state.movie.filter((m) => {
                let title = m.title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase());
            })
        }
        if (this.state.currGen !== "All Genres") {
            filterarr = this.state.movie.filter((m) => genreids[m.genre_ids[0]] === this.state.currGen);
        }
        let pages = Math.ceil( (filterarr.length) / this.state.limit );
        let pagearr = [];
        for( let i = 1 ; i <= pages ; i++ ) {
            pagearr.push(i);
        }
        let si = (this.state.currPage-1) * this.state.limit;
        let ei = si + this.state.limit;
        filterarr = filterarr.slice( si, ei );
        return (
            <>
                <div className="main">
                    <div className="row">
                        <div className='col-lg-3 col-sm-6'>
                            <ul className="list-group fav-genre">
                                {
                                    this.state.genres.map((genre) => (
                                        this.state.currGen === genre ? <li className="list-group-item" style={{ background: '#3f51b5', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>{genre}</li> :
                                            <li className="list-group-item" style={{ background: 'white', color: '#3f51b5', cursor: 'pointer' }} onClick={() => this.handleGenre(genre)}>{genre}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='col-lg-9 col-sm-12 fav-table'>
                            <div className='row'>
                                <input type="text" className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(e) => this.setState({ currText: e.target.value })} />
                                <input type="number" className='input-group-text col' placeholder='No. of Rows' value={this.state.limit} onChange={(e) => this.setState({ limit: e.target.value })}/>
                            </div>
                            <div className='row'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col">Popularity</th>
                                            <th scope="col" className='sort-button' onClick={this.sortRating}>Rating</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterarr.map((m) => (

                                                <tr>
                                                    <td><img src={`https://image.tmdb.org/t/p/original${m.backdrop_path}`} alt={m.title} style={{ width: '5rem', borderRadius: '5%', marginRight: '5px' }} />{m.title}</td>
                                                    <td>{genreids[m.genre_ids[0]]}</td>
                                                    <td>{m.popularity}</td>
                                                    <td>{m.vote_average}</td>
                                                    <td><button type="button" className="btn btn-danger" onClick={() => this.deleteMovie(m)}>Delete</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    {
                                        pagearr.map( (page) => (
                                            <li className="page-item"><a className="page-link" onClick={() => this.handlePage(page)}>{page}</a></li>
                                        ))
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
