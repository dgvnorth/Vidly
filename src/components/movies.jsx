import React, { Component } from 'react';
import ListGroup from './listGroup';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import _ from 'lodash';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import { Link } from 'react-router-dom';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: 'title', order: 'asc' }
    };

    componentDidMount() {
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]
        this.setState({ movies: getMovies(), genres })
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies })
    }

    hadlePageChange = (page) => {
        this.setState({ currentPage: page })
    }

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 })
    }

    handleSort = (sortColumn) => {
        this.setState({ sortColumn })
    }

    getPageData = () => {
        const { currentPage, pageSize, movies: allMovies, selectedGenre, sortColumn } = this.state;
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: movies }
    }

    render() {
        const { length: count } = this.state.movies;
        const { currentPage, pageSize, genres, selectedGenre, sortColumn } = this.state;
        if (count === 0) return <p>There are no movies in the database.</p>

        const { totalCount, data } = this.getPageData()
        return (
            <div className='row'>
                <div className='col-3'>
                    <ListGroup
                        items={genres}
                        selectedItem={selectedGenre}
                        onItemSelect={this.handleGenreSelect} />
                </div>
                <div className='col'>
                    <Link
                        to='/movies/new'
                        className='btn btn-primary'
                        style={{ marginBottom: 20 }}>
                        New Movie
                    </Link>
                    <p>Showing {totalCount} movies in the database.</p>
                    <MoviesTable
                        movies={data}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort} />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.hadlePageChange} />
                </div>
            </div>
        )


    }
}

export default Movies;