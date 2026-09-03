import { useState } from 'react';
import './style.css';
import { Link } from 'react-router';
import WaitToSetState from '../../helpers/WaitToSetState';

function Header() {
    const [clicked, setClicked] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const navButtonImage = navOpen ? "/images/img-red-dragon-eye-opening.gif" : "/images/img-red-dragon-eye-closing.gif";

    return (
        <>
            <img className="logo" alt="img-header-logo" src="/images/img-header-logo.png" />

            <Link key='Home' to='/'>
                <img className="img-header-image" alt="img-header-main" src="/images/img-header.png" />
            </Link>

            <button type="button" className="btn-dragon-eye" disabled={clicked}
                onClick={() => {
                    setClicked(true);
                    WaitToSetState(setClicked, false, 900);
                    setNavOpen(!navOpen);
                }}>
                <img key="dragons-eye" className="img-dragon-eye" src={navButtonImage} alt="dragons-eye" />
            </button>
        </>
    );
}

export default Header;