/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { shuffle } from "gsap/gsap-core";
import { Container } from "react-bootstrap";

import SplashScreen from "./SplashScreen.jsx";
import NavBar from "../Navbars/NavBar.jsx";
import MainMovie from "./MainMovie.jsx";

import FetchedMovieController from "../../controllers/FetchedMovieController.js";
import {
    hasSeenSplash,
    setSplashSeen,
    sortByVoteAverage,
    stringQuery
} from "../../helper/miscs.js";

function Movies(props) {
    const fetcherRef = useRef(null);
    if (!fetcherRef.current) {
        fetcherRef.current = new FetchedMovieController();
    }
    const fetcher = fetcherRef.current;

    const hasFetched = useRef(false);

    const [showSplash, setShowSplash] = useState(false);
    const [section, setSection] = useState("home");

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
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetcher.getAllTrending().then((data) => {
            setAllTrending(shuffle([...data]));
        });

        fetcher.getAllPopular().then((data) => {
            setAllPopular(data);
        });

        fetcher.getTopRatedMovies().then((data) => {
            setTopRatedMovies(data);
        });

        fetcher.discoverTvShows().then((data) => {
            setOnlySeries(data);
        });
    }, [fetcher]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleSectionChange = async (nextSection) => {
        if (nextSection === "movies" && onlyMovies.length === 0) {
            const movies = await fetcher.discoverMovies();
            setOnlyMovies(movies);
        }

        if (nextSection === "series" && onlySeries.length === 0) {
            const series = await fetcher.discoverTvShows();
            setOnlySeries(series);
        }

        setSection(nextSection);
    };

    return showSplash ? (
        <SplashScreen />
    ) : (
        <HomePage
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
        />
    );
}

function HomePage(props) {
    const fetcherRef = useRef(null);
    if (!fetcherRef.current) {
        fetcherRef.current = new FetchedMovieController();
    }
    const fetcher = fetcherRef.current;

    const debounceRef = useRef(null);

    const handleSearch = (query) => {
        if (query.length < 3) return;

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            fetcher.search(stringQuery(query)).then((movies) => {
                props.handleSearchResults(movies, query);
            });
        }, 800);
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