import css from './App.module.css'
import SearchBar from '../SearchBar/SearchBar';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import toast from 'react-hot-toast';



export default function App() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSiedebarOpen, setisSiedebarOpen] = useState<boolean>(false);

    const handlerSubmit = async (query: string) => {
        try{
        setMovies([]);
        setIsError(false);
        setIsLoading(true);
        const result = await fetchMovies(query);
        if (result.length === 0 )
          toast("No movies found for your request.");


        setMovies(result);
        }
        catch {
          setIsError(true);
          toast("No movies found for your request.");
        }
        finally {
          setIsLoading(false);
        }
    }

    const openSiedebar = () => setisSiedebarOpen(true);
    const closeSiedebar = () => setisSiedebarOpen(false);


  return (
    <div className={css.app}>
    <SearchBar onSubmit={handlerSubmit} />
    {isLoading && <Loader/>}
    {isError && <ErrorMessage/>}
    {movies.length > 0 && <MovieGrid onSelect = {openSiedebar} movies={movies}/>}
    {isSiedebarOpen && <MovieModal onClose = {closeSiedebar} movie = {movies}/> }
    </div>
  );
}