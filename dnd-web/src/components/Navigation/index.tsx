import { Link } from 'react-router';
import './style.css';

function Navigation() {
    return (
        <>
            <Link className="nav-link btn-home" key="home" to="/">
                <span>Home</span>
            </Link>
            <Link className="nav-link btn-heroes" key="heroes" to="/hero">
                <span>Heroes</span>
            </Link>
            <Link className='nav-link btn-monsters' key="monsters" to="/monster">
                <span>Monsters</span>
            </Link>
        </>
    )
}

export default Navigation;
