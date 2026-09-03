import { useEffect, useState } from "react";
import "./style.css";
import { GetAllMonsterDetails, MonstersDetails } from "./get-all-monsters";
import MonsterDetails from "./monster-details";

function Monster() {
    const [monsters, setMonsters] = useState<MonstersDetails[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        GetAllMonsterDetails()
            .then(setMonsters)
            .catch(() => setError('Unable to reach the server. Please try again later.'));
    }, []);

    return (
        <div className="monster-list">
            <h1>Monsters</h1>
            {error
                ? <span className="error-message">{error}</span>
                : monsters
                    .sort((a, b) => a.name > b.name ? 1 : -1)
                    .map((monster, index) => (
                        <MonsterDetails key={monster.name} monster={monster} index={index} />
                    ))}
        </div>
    );
}

export default Monster;