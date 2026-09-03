import config from "../../config";

export interface MonstersDetails {
    name: string;
    description: string;
    stats: {
        armorClass: string;
        hitPoints: string;
        speed: string;
    };
    attributes: {
        strength: string;
        dexterity: string;
        constitution: string;
        intelligence: string;
        wisdom: string;
        charisma: string;
    };
}

export async function GetAllMonsterDetails(): Promise<MonstersDetails[]> {
    const response = await fetch(`${config.VITE_API_BASE_URL}/api/compendium/monsters`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) throw new Error();

    return await response.json();
}
