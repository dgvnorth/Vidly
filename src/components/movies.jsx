import React, { Component } from 'react';
import { toast } from 'react-toastify';
import ListGroup from './listGroup';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import SearchBox from './searchBox';
import _ from 'lodash';
import { getMovies, deleteMovie } from '../services/movieService';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/genreService';
import { Link } from 'react-router-dom';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: '',
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc' }
    };

    async componentDidMount() {
        const { data } = await getGenres()
        const genres = [{ _id: '', name: 'All Genres' }, ...data];

        const { data: movies } = await getMovies();
        this.setState({ movies, genres })
    }

    handleDelete = async movie => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({ movies });

        try {
            await deleteMovie(movie._id);
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error('This movie has already been deleted.')

            this.setState({ movies: originalMovies })
        }
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
        this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 })
    }

    handleSort = (sortColumn) => {
        this.setState({ sortColumn })
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
    }

    getPageData = () => {
        const { currentPage, pageSize, movies: allMovies, selectedGenre, sortColumn, searchQuery } = this.state;

        let filtered = allMovies;
        if (searchQuery)
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: movies }
    }

    render() {
        // const { length: count } = this.state.movies;
        const { currentPage, pageSize, genres, selectedGenre, sortColumn, searchQuery } = this.state;
        const { user } = this.props;
        console.log('ahora', this.state.movies)

        // if (count === 0) return <p>There are no movies in the database.</p>

        const { totalCount, data } = this.getPageData()
        return (
            < React.Fragment >
                <div className='col'>
                    <div>
                        <ListGroup
                            items={genres}
                            selectedItem={selectedGenre}
                            onItemSelect={this.handleGenreSelect} />
                    </div>
                    {user && <Link
                        to='/movies/new'
                        className='btn btn-primary'
                        style={{ marginBottom: 20 }}>
                        New Movie
                    </Link>}
                    <p>Showing {totalCount} movies in the database.</p>
                    <SearchBox
                        value={searchQuery}
                        onChange={this.handleSearch} />
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
            </React.Fragment >

        )


    }
}

export default Movies;