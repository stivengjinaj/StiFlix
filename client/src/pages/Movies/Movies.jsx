import GridMovies from "./GridMovies.jsx";

{/* eslint-disable react/prop-types */}
import {useEffect, useState} from "react";
import SplashScreen from "./SplashScreen.jsx";
import {Container, Row} from "react-bootstrap";
import NavBar from "./NavBar.jsx";
import MainMovie from "./MainMovie.jsx";
import MoviesCarousel from "./MoviesCarousel.jsx";
import FetchedMovieController from "../../controllers/FetchedMovieController.js";
import {sortByVoteAverage} from "../../helper/miscs.js";

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
    return (
        <Container fluid className="p-0 bg-gradient-dark-radius min-vh-100">
            <NavBar section={props.section} handleSectionChange={props.handleSectionChange}/>
            <MainMovie mainMovie={props.allTrending}/>
            {(() => {
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
            })()}

            <footer className="text-white text-center p-3 mt-5">
                <Container>
                    <Row>
                        <h6>Stiflix does not store any of the contents present in the site.</h6>
                        <strong>Copyright © Stiflix 2024</strong>
                    </Row>
                </Container>
            </footer>
        </Container>
    );
}

export default Movies;