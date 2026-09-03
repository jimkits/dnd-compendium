import { useEffect, useState } from "react";
import "./style.css";
import { GetAllHeroDetails, AllHeroDetails } from './get-all-heroes';
import HeroDetails from './hero-details';

function Hero() {
    const [heroes, setHeroes] = useState<AllHeroDetails[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        GetAllHeroDetails()
            .then(setHeroes)
            .catch(() => setError('Unable to reach the server. Please try again later.'));
    }, []);

    const filtered = heroes
        .sort((a, b) => a.name > b.name ? 1 : -1)
        .filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="heroes">
            <h1>Heroes</h1>
            <div className="search">
                <div className="search-wrapper">
                    <span className="search-icon">⌕</span>
                    <input
                        className="search-text"
                        type="text"
                        placeholder="Search heroes..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            {error
                ? <span className="error-message">{error}</span>
                : filtered.map((hero, index) => (
                    <HeroDetails key={hero.name} hero={hero} index={index} />
                ))}
        </div>
    );
}

export default Hero;