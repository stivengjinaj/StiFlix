import { useLayoutEffect, useRef } from 'react';
import sc_background from '../../assets/images/sc_background.png';
import sc_logo from '../../assets/images/sc.png';
import { Container, Row, Col, Button } from 'react-bootstrap';
import gsap from 'gsap';

import random_icon from '../../assets/images/dices.png';
import catalog_icon from '../../assets/images/movies_catalog.png';

const StiflixChillHero = () => {
    const comp = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".stiflix-slogan", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
                .from(".choice-card", {
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)"
                }, "-=0.5");

        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <Container fluid
                   className="stiflix-bg-container vh-100 d-flex flex-column"
                   style={{
                       backgroundImage: `url(${sc_background})`,
                       backgroundSize: 'cover',
                       backgroundPosition: 'center',
                   }}
                   ref={comp}
        >

            <Row
                className="justify-content-between align-items-center py-3 rounded-bottom-3 flex-grow-0"
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
                    <Button className="sc_button" variant="danger">
                        Leave Stiflix&Chill
                    </Button>
                </div>
            </Row>

            <Container className="flex-grow-1 d-flex flex-column justify-content-start">
                <Row className="justify-content-center mt-4">
                    <Col xs={12} className="text-center text-white">
                        <h1 className="stiflix-slogan">
                            Because the movies is not the main event...
                        </h1>
                    </Col>
                </Row>

                <Row className="justify-content-center g-5">
                    <Col md={5} lg={4} className="me-4">
                        <div className="choice-card p-5 text-center text-white d-flex flex-column align-items-center justify-content-center">
                            <img src={random_icon} alt="Random Choice" width={150} height={150} className="mb-4" style={{filter: 'invert(1)'}} />
                            <h3>Roll the Dice</h3>
                            <p className="mb-0">Let fate decide your night.</p>
                        </div>
                    </Col>

                    <Col md={5} lg={4} className="ms-4">
                        <div className="choice-card p-5 text-center text-white d-flex flex-column align-items-center justify-content-center">
                            <img src={catalog_icon} alt="Catalogue" width={140} height={140} className="mb-4" />
                            <h3>The Catalogue</h3>
                            <p className="mb-0">Choose your perfect backdrop.</p>
                        </div>
                    </Col>
                </Row>
            </Container>

        </Container>
    );
};

export default StiflixChillHero;