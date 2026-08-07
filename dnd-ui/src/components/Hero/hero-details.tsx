import { AllHeroDetails } from './get-all-heroes';
import '../../typography.css'

interface Props {
    hero: AllHeroDetails;
    index: number;
}

function HeroDetails({ hero, index }: Props) {
    return (
        <>
            {index !== 0 && <div className='hero-list-divider'>✦</div>}
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
                        <span className='value'>{hero.core_traits.primary_ability}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Saving Throw Proficiencies</span>
                        <span className='value'>{hero.core_traits.saving_throw_proficiencies}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Hit Point Die</span>
                        <span className='value'>{hero.core_traits.hit_point_die}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Weapon Proficiencies</span>
                        <span className='value'>{hero.core_traits.weapon_proficiencies}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Armor Training</span>
                        <span className='value'>{hero.core_traits.armor_training}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Tool Proficiencies</span>
                        <span className='value'>{hero.core_traits.tool_proficiencies}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Skill Proficiencies</span>
                        <span className='value'>{hero.core_traits.skill_proficiencies}</span>
                    </div>
                    <hr className='divider' />
                    <div className='trait'>
                        <span className='label-heading'>Starting Equipment</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Option A</span>
                        <span className='value'>{hero.core_traits.starting_equipment.option_a}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Option B</span>
                        <span className='value'>{hero.core_traits.starting_equipment.option_b}</span>
                    </div>
                    <div className='trait'>
                        <span className='label'>Option C</span>
                        <span className='value'>{hero.core_traits.starting_equipment.option_c}</span>
                    </div>
                    <hr className='divider' />
                </div>
                <img className='image' src={hero.image.startsWith('/') ? hero.image : `data:image/png;base64,${hero.image}`} alt='hero-image' />
            </div>
            <span className='description' style={{ whiteSpace: 'pre-line' }}>{hero.description}</span>
        </>
    );
}

export default HeroDetails;
