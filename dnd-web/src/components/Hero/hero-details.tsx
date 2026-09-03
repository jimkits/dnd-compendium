import config from "../../config";
import { AllHeroDetails } from './get-all-heroes';
import '../../typography.css'

interface Props {
    hero: AllHeroDetails;
    index: number;
}

function HeroDetails({ hero, index }: Props) {
    return (
        <>
            {index !== 0 && <div className='list-divider wide'>✦</div>}
            <div className='hero' style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
                <div className='hero details'>
                    <span className='name'>{hero.name}</span>
                    <div className='trait'>
                        <span className='label'>Book</span>
                        <span className='value'>{hero.book}</span>
                    </div>
                    <hr className='divider' />
                    <div className='trait'>
                        <span className='label-heading'>Core Traits</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Primary Ability</span>
                        <span className='value'>{hero.coreTraits?.primaryAbility}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Saving Throw Proficiencies</span>
                        <span className='value'>{hero.coreTraits?.savingThrowProficiencies}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Hit Point Die</span>
                        <span className='value'>{hero.coreTraits?.hitPointDie}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Weapon Proficiencies</span>
                        <span className='value'>{hero.coreTraits?.weaponProficiencies}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Armor Training</span>
                        <span className='value'>{hero.coreTraits?.armorTraining}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Tool Proficiencies</span>
                        <span className='value'>{hero.coreTraits?.toolProficiencies}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Skill Proficiencies</span>
                        <span className='value'>{hero.coreTraits?.skillProficiencies}</span>
                    </div>
                    <hr className='divider' />
                    <div className='trait'>
                        <span className='label-heading'>Starting Equipment</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Option A</span>
                        <span className='value'>{hero.coreTraits?.startingEquipment?.optionA}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Option B</span>
                        <span className='value'>{hero.coreTraits?.startingEquipment?.optionB}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Option C</span>
                        <span className='value'>{hero.coreTraits?.startingEquipment?.optionC}</span>
                    </div>
                    <hr className='divider' />
                </div>
                <img className='image' src={`${config.VITE_API_BASE_URL}/api/compendium/heroes/${encodeURIComponent(hero.name)}/portrait`} alt='hero-image' />
            </div>
            <span className='description' style={{ whiteSpace: 'pre-line' }}>{hero.description}</span>
        </>
    );
}

export default HeroDetails;
