import { GetAllHeroDetails, AllHeroDetails } from './get-all-heroes';

describe('GetAllHeroDetails', () => {
    beforeEach(() => {
        globalThis.fetch = jest.fn() as unknown as typeof fetch;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('returns parsed heroes on a successful response', async () => {
        const heroes: AllHeroDetails[] = [{
            name: 'Aria', description: 'd', book: 'b', imageFile: 'i',
            coreTraits: {
                primaryAbility: 'Dex', hitPointDie: 'd8', savingThrowProficiencies: '',
                skillProficiencies: '', weaponProficiencies: '', toolProficiencies: '',
                armorTraining: '', startingEquipment: { optionA: '', optionB: '', optionC: '' },
            },
        }];
        (globalThis.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(heroes),
        });

        await expect(GetAllHeroDetails()).resolves.toEqual(heroes);
    });

    it('returns an empty array when the API responds with no heroes', async () => {
        (globalThis.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([]),
        });

        await expect(GetAllHeroDetails()).resolves.toEqual([]);
    });

    it('throws when the response is not ok', async () => {
        (globalThis.fetch as jest.Mock).mockResolvedValue({ ok: false });

        await expect(GetAllHeroDetails()).rejects.toThrow();
    });

    it('rejects when the network request fails', async () => {
        (globalThis.fetch as jest.Mock).mockRejectedValue(new TypeError('Failed to fetch'));

        await expect(GetAllHeroDetails()).rejects.toThrow('Failed to fetch');
    });
});
