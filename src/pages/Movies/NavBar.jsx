import {useEffect, useState} from "react";
import NavBarDesktop from "./NavBarDesktop.jsx";
import NavBarMobile from "./NavBarMobile.jsx";

function NavBar() {
    const [screen, setScreen] = useState('desktop');
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setScreen('mobile');
            } else {
                setScreen('desktop');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
        screen === 'desktop'
            ? (<NavBarDesktop />)
            : (<NavBarMobile />)
    );
}

export default NavBar;