import {useLayoutEffect, useRef, useState} from "react";
import gsap from "gsap";
import {Col, Container, Row} from "react-bootstrap";
import random_icon from '../../assets/images/dices.png';
import catalog_icon from '../../assets/images/movies_catalog.png';
import PropTypes from "prop-types";

function Choice({ comp, setStep, setChoice }) {
    const isAnimating = useRef(false);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    useLayoutEffect(() => {
        if (!comp || !comp.current || imagesLoaded < 2) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl
                .from(".top-bar", {
                    y: -100,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power3.out"
                })
                .fromTo(".stiflix-slogan",
                    { y: 30, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
                    "-=0.3"
                )
                .fromTo(".choice-card",
                    { y: 100, autoAlpha: 0 },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.4,
                        ease: "back.out(1.7)",
                        stagger: 0.15,
                        clearProps: "transform"
                    },
                    "-=0.4"
                );
        }, comp);

        return () => ctx.revert();
    }, [comp, imagesLoaded]);

    const handleChoiceClick = (choiceValue) => {
        if (isAnimating.current || !comp.current) return;
        isAnimating.current = true;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setStep(1);
                    setChoice(choiceValue);
                }
            });

            tl.to(".stiflix-slogan", {
                y: -30,
                autoAlpha: 0,
                duration: 0.4,
                ease: "power2.in"
            })
                .to(".choice-card", {
                    y: 200,
                    autoAlpha: 0,
                    duration: 0.5,
                    ease: "back.in(1.2)",
                    stagger: 0.1
                }, "-=0.2");
        }, comp);

        return () => ctx.revert();
    };

    return (
        <Container className="flex-grow-1 d-flex flex-column justify-content-start">
            <Row className="justify-content-center mt-4">
                <Col xs={12} className="text-center text-white">
                    <h1 className="stiflix-slogan" style={{ opacity: 0 }}>
                        Because the movie is not the main event...
                    </h1>
                </Col>
            </Row>

            <Row className="justify-content-center g-5 mt-3">
                <Col md={5} lg={4} className="me-4">
                    <div
                        className="choice-card p-5 text-center text-white d-flex flex-column align-items-center justify-content-center"
                        onClick={() => handleChoiceClick(0)}
                        style={{ cursor: 'pointer', opacity: 0 }}
                    >
                        <img
                            src={random_icon}
                            alt="Random Choice"
                            width={150}
                            height={150}
                            className="mb-4"
                            style={{filter: 'invert(1)', pointerEvents: 'none'}}
                            onLoad={() => setImagesLoaded((prev) => prev + 1)}
                        />
                        <h3>Roll the Dice</h3>
                        <p className="mb-0">Let fate decide your night.</p>
                    </div>
                </Col>

                <Col md={5} lg={4} className="ms-4">
                    <div
                        className="choice-card p-5 text-center text-white d-flex flex-column align-items-center justify-content-center"
                        onClick={() => handleChoiceClick(1)}
                        style={{ cursor: 'pointer', opacity: 0 }}
                    >
                        <img
                            src={catalog_icon}
                            alt="Catalogue"
                            width={140}
                            height={140}
                            className="mb-4"
                            style={{ pointerEvents: 'none' }}
                            onLoad={() => setImagesLoaded((prev) => prev + 1)}
                        />
                        <h3>The Catalogue</h3>
                        <p className="mb-0">Choose your perfect backdrop.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

Choice.propTypes = {
    comp: PropTypes.object.isRequired,
    setStep: PropTypes.func.isRequired,
    setChoice: PropTypes.func.isRequired
}

export default Choice;