{/*eslint-disable react/prop-types*/}
import {useEffect, useState} from "react";
import NavBarDesktop from "./NavBarDesktop.jsx";
import NavBarMobile from "./NavBarMobile.jsx";

function NavBar(props) {
    const [screen, setScreen] = useState('desktop');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                console.log("mobile");
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
            ? (
                <NavBarDesktop
                    user={props.user}
                    section={props.section}
                    handleSectionChange={props.handleSectionChange}
                    handleSearch={props.handleSearch}
                    handleSignOut={props.handleSignOut}
                    searchQuery={props.searchQuery}
                    startSearching={props.startSearching}
                    isSmartTV={props.isSmartTV}
                />
            )
            : (
                <NavBarMobile
                    user={props.user}
                    section={props.section}
                    handleSectionChange={props.handleSectionChange}
                    handleSearch={props.handleSearch}
                    handleSignOut={props.handleSignOut}
                    searchQuery={props.searchQuery}
                    startSearching={props.startSearching}
                    isSmartTV={props.isSmartTV}
                />
            )
    );
}

export default NavBar;