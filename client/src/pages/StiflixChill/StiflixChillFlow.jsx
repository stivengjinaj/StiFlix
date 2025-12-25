import {useEffect, useRef, useState} from 'react';
import sc_background from '../../assets/images/sc_background.png';
import sc_logo from '../../assets/images/sc.png';
import {Container, Row, Button} from 'react-bootstrap';
import Choice from "./Choice.jsx";
import RandomChoice from "./RandomChoice.jsx";
import MovieCatalogue from "./MovieCatalogue.jsx";
import PropTypes from "prop-types";
import Loading from "../Miscs/Loading.jsx";
import {useNavigate} from "react-router-dom";

const StiflixChillFlow = ({ movies, page, setPage }) => {
    const comp = useRef(null);
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [choice, setChoice] = useState(null);

    useEffect(() => {
        if (step > 1 || step < 0) {
            setStep(0);
            setChoice(null);
        }
    }, [step]);

    return (
        movies.results && movies.results.length > 0
            ? <Container
                fluid
                className="stiflix-bg-container vh-100 d-flex flex-column"
                style={{
                    backgroundImage: `url(${sc_background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                ref={comp}
            >
                <Row
                    className="justify-content-between align-items-center py-3 rounded-bottom-3 flex-grow-0 top-bar"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        boxShadow: '0 4px 40px rgba(229, 9, 20, 0.5)',
                        backdropFilter: 'blur(5px)',
                        position: 'relative',
                    }}
                >
                    <div className="col-6 p-3">
                        <img src={sc_logo} alt={"Stiflix&Chill"} width={300} height={70} style={{objectFit: 'contain'}}/>
                    </div>
                    <div className="col-6 p-3 text-end">
                        <Button
                            className="sc_button"
                            variant="danger"
                            onClick={() => navigate("/movies")}
                        >
                            Leave Stiflix&Chill
                        </Button>
                    </div>
                </Row>

                {step === 0 && <Choice comp={comp} step={step} setStep={setStep} setChoice={setChoice}/>}
                {step === 1 && (
                    choice === 0
                        ? <RandomChoice
                            movies={movies}
                            setStep={setStep}
                        />
                        : <MovieCatalogue
                            movies={movies}
                            page={page}
                            setPage={setPage}
                            setStep={setStep}
                        />
                )}
            </Container>
            : <Loading />
    );
};

StiflixChillFlow.propTypes = {
    movies: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
}

export default StiflixChillFlow;