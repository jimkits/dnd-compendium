import { Link } from 'react-router';
import './style.css';

function Navigation() {
    return (
        <>
            <Link className="nav-link btn-home" key="home" to="/" state="Home">
                <span>Home</span>
            </Link>
            <Link className="nav-link btn-heroes" key="heroes" to="/hero" state="Heroes">
                <span>Heroes</span>
            </Link>
            <Link className='nav-link btn-monsters' key="monsters" to="/monster" state="Monsters">
                <span>Monsters</span>
            </Link>
        </>
    )
}

export default Navigation;
