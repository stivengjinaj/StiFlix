import GridMovies from "./GridMovies.jsx";

{/* eslint-disable react/prop-types */}
import {useEffect, useState} from "react";
import SplashScreen from "./SplashScreen.jsx";
import {Container} from "react-bootstrap";
import NavBar from "../Navbars/NavBar.jsx";
import MainMovie from "./MainMovie.jsx";
import MoviesCarousel from "./MoviesCarousel.jsx";
import FetchedMovieController from "../../controllers/FetchedMovieController.js";
import {sortByVoteAverage, stringQuery} from "../../helper/miscs.js";
import SeachResults from "./SeachResults.jsx";
import StiflixFooter from "../Miscs/StiflixFooter.jsx";

function Movies() {
    const fetcher = new FetchedMovieController();
    const [showSplash, setShowSplash] = useState(true);
    const [section, setSection] = useState('home');
    const [allPopular, setAllPopular] = useState([]);
    const [allTrending, setAllTrending] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [onlyMovies, setOnlyMovies] = useState([]);
    const [onlySeries, setOnlySeries] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [trending, popular, movies, series] = await Promise.all([
                    fetcher.getAllTrending(),
                    fetcher.getAllPopular(),
                    fetcher.getTopRatedMovies(),
                    fetcher.discoverTvShows()
                ]);
                setAllTrending([...trending]);
                setAllPopular([...popular]);
                setTopRatedMovies([...movies]);
                setOnlySeries([...series]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleSectionChange = (section) => {
        const getOnlyMovies = async () => {
            const movies = await fetcher.discoverMovies();
            setOnlyMovies([...movies]);
        }
        const getOnlySeries = async () => {
            const series = await fetcher.discoverTvShows();
            setOnlySeries([...series]);
        }
        section === "movies" ? getOnlyMovies() : getOnlySeries();
        setSection(section);
    }

    return (
        showSplash
            ? (<SplashScreen />)
            : (<HomePage
                allTrending={allTrending}
                allPopular={allPopular}
                topRatedMovies={topRatedMovies}
                topRatedSeries={sortByVoteAverage(onlySeries)}
                onlyMovies={onlyMovies}
                onlySeries={onlySeries}
                section={section}
                handleSectionChange={handleSectionChange}
            />)
    );
}

function HomePage(props) {
    const fetcher = new FetchedMovieController();
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [isSearching, setIsSearching ] = useState(false);

    const handleSearch = (query) => {
        fetcher.search(stringQuery(query)).then((movies) => {
            setSearchedMovies([...movies]);
        });
    }
    const startSearching = () => {
        setSearchedMovies([]);
        setIsSearching(!isSearching);
    };

    return (
        <Container fluid className="p-0 bg-gradient-dark-radius min-vh-100">
            <NavBar
                section={props.section}
                handleSectionChange={props.handleSectionChange}
                handleSearch={handleSearch}
                startSearching={startSearching}
            />
            <MainMovie mainMovie={props.allTrending}/>
            {
                !isSearching
                    ? (
                        (() => {
                            switch (props.section) {
                                case 'home':
                                    return (
                                        <>
                                            <MoviesCarousel title={"Popular on Stiflix"} movies={props.allPopular} moving={true} scrollable={false}/>
                                            <MoviesCarousel title={"Trending Now"} movies={props.allTrending} moving={false} scrollable={true}/>
                                            <MoviesCarousel title={"Top Rated Movies"} movies={props.topRatedMovies} moving={false} scrollable={true}/>
                                            <MoviesCarousel title={"Top Rated TV Shows"} movies={props.topRatedSeries} moving={false} scrollable={true}/>
                                        </>
                                    );
                                case 'movies':
                                    return <GridMovies movies={props.onlyMovies} />;
                                case 'tvShows':
                                    return <GridMovies movies={props.onlySeries} />;
                                default:
                                    return <div>Section not found</div>;
                            }
                        })()
                    )
                    : (
                        props.allTrending.length > 0 && <SeachResults movies={searchedMovies}/>
                    )
            }
            <StiflixFooter />
        </Container>
    );
}

export default Movies;