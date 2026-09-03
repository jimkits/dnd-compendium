import config from "../../config";

export interface AllHeroDetails {
    name: string;
    description: string;
    book: string;
    imageFile: string;
    coreTraits?: CoreTraits;
}

export interface CoreTraits {
    primaryAbility: string;
    hitPointDie: string;
    savingThrowProficiencies: string;
    skillProficiencies: string;
    weaponProficiencies: string;
    toolProficiencies: string;
    armorTraining: string;
    startingEquipment?: StartingEquipment;
}

export interface StartingEquipment {
    optionA: string;
    optionB: string;
    optionC: string;
}

export async function GetAllHeroDetails(): Promise<AllHeroDetails[]> {
    const response = await fetch(`${config.VITE_API_BASE_URL}/api/compendium/heroes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) throw new Error();

    return await response.json();
}
