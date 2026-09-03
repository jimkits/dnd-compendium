import "./style.css";
import { MonstersDetails } from "./get-all-monsters";

interface Props {
    monster: MonstersDetails;
    index: number;
}

function MonsterDetails({ monster, index }: Props) {
    return (
        <>
            {index !== 0 && <div className='list-divider'>✦</div>}
            <h1 className="monster-name">{monster.name}</h1>
            <div className="monster-information">
                <p className="monster-description" style={{ whiteSpace: 'pre-line' }}>{monster.description}</p>
                <div className="monster-details">
                    <div className="monster-stats">
                        <div className="stat-row">
                            <span className="stat-label">AC</span>
                            <span className="stat-value">{monster.stats?.armorClass}</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">HP</span>
                            <span className="stat-value">{monster.stats?.hitPoints}</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">SPEED</span>
                            <span className="stat-value">{monster.stats?.speed}</span>
                        </div>
                    </div>
                    <div className="monster-attributes">
                        <div className="ability-score">
                            <span className="ability-label">STR</span>
                            <span className="ability-value">{monster.attributes?.strength}</span>
                        </div>
                        <div className="ability-score">
                            <span className="ability-label">DEX</span>
                            <span className="ability-value">{monster.attributes?.dexterity}</span>
                        </div>
                        <div className="ability-score">
                            <span className="ability-label">CON</span>
                            <span className="ability-value">{monster.attributes?.constitution}</span>
                        </div>
                    </div>
                    <div className="monster-attributes">
                        <div className="ability-score">
                            <span className="ability-label">INT</span>
                            <span className="ability-value">{monster.attributes?.intelligence}</span>
                        </div>
                        <div className="ability-score">
                            <span className="ability-label">WIS</span>
                            <span className="ability-value">{monster.attributes?.wisdom}</span>
                        </div>
                        <div className="ability-score">
                            <span className="ability-label">CHA</span>
                            <span className="ability-value">{monster.attributes?.charisma}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MonsterDetails;