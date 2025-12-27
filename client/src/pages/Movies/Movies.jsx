import {shuffle} from "gsap/gsap-core";

{/* eslint-disable react/prop-types */}
import {useEffect, useRef, useState} from "react";
import SplashScreen from "./SplashScreen.jsx";
import {Container} from "react-bootstrap";
import NavBar from "../Navbars/NavBar.jsx";
import MainMovie from "./MainMovie.jsx";
import FetchedMovieController from "../../controllers/FetchedMovieController.js";
import {hasSeenSplash, setSplashSeen, sortByVoteAverage, stringQuery} from "../../helper/miscs.js";

function Movies(props) {
    const fetcher = new FetchedMovieController();
    const hasFetched = useRef(false);
    const [showSplash, setShowSplash] = useState(false);
    const [section, setSection] = useState('home');
    const [allPopular, setAllPopular] = useState([]);
    const [allTrending, setAllTrending] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [onlyMovies, setOnlyMovies] = useState([]);
    const [onlySeries, setOnlySeries] = useState([]);

    useEffect(() => {
        if (!hasSeenSplash()) {
            setShowSplash(true);
            setSplashSeen();
        }
    }, []);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [trending, popular, movies, series] = await Promise.all([
                    fetcher.getAllTrending(),
                    fetcher.getAllPopular(),
                    fetcher.getTopRatedMovies(),
                    fetcher.discoverTvShows()
                ]);
                setAllTrending(shuffle([...trending]));
                setAllPopular([...popular]);
                setTopRatedMovies([...movies]);
                setOnlySeries([...series]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (hasFetched.current) return;
        hasFetched.current = true;
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
                user={props.user}
                userMovies={props.userMovies}
                searchQuery={props.searchQuery}
                searchResults={props.searchResults}
                handleSearchResults={props.handleSearchResults}
                allTrending={allTrending}
                allPopular={allPopular}
                topRatedMovies={topRatedMovies}
                topRatedSeries={sortByVoteAverage(onlySeries)}
                onlyMovies={onlyMovies}
                onlySeries={onlySeries}
                section={section}
                handleSectionChange={handleSectionChange}
                handleSignOut={props.handleSignOut}
                isSmartTV={props.isSmartTV}
            />)
    );
}

function HomePage(props) {
    const fetcherRef = useRef(null);
    if (!fetcherRef.current) {fetcherRef.current = new FetchedMovieController();}
    const fetcher = fetcherRef.current;

    const debounceRef = useRef(null);

    const handleSearch = (query) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            fetcher.search(stringQuery(query)).then((movies) => {
                props.handleSearchResults(movies, query);
            });
        }, 1000);
    };

    const startSearching = () => {
        props.handleSearchResults([], "");
    };

    return (
        <Container fluid className="p-0">
            <NavBar
                user={props.user}
                section={props.section}
                handleSectionChange={props.handleSectionChange}
                handleSearch={handleSearch}
                handleSignOut={props.handleSignOut}
                searchQuery={props.searchQuery}
                startSearching={startSearching}
                isSmartTV={props.isSmartTV}
            />
            <MainMovie
                user={props.user}
                userMovies={props.userMovies}
                isSearching={props.searchQuery !== ""}
                searchQuery={props.searchQuery}
                searchedResults={props.searchResults}
                handleSearchResults={props.handleSearchResults}
                section={props.section}
                allPopular={props.allPopular}
                allTrending={props.allTrending}
                topRatedMovies={props.topRatedMovies}
                topRatedSeries={props.topRatedSeries}
                onlyMovies={props.onlyMovies}
                onlySeries={props.onlySeries}
                isSmartTV={props.isSmartTV}
            />
        </Container>
    );
}

export default Movies;