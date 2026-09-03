import { GetAllMonsterDetails, MonstersDetails } from './get-all-monsters';

describe('GetAllMonsterDetails', () => {
    beforeEach(() => {
        globalThis.fetch = jest.fn() as unknown as typeof fetch;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('returns parsed monsters on a successful response', async () => {
        const monsters: MonstersDetails[] = [{
            name: 'Ancient Wyrm', description: 'd',
            stats: { armorClass: '20', hitPoints: '200', speed: '40 ft' },
            attributes: { strength: '25', dexterity: '10', constitution: '22', intelligence: '16', wisdom: '14', charisma: '18' },
        }];
        (globalThis.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(monsters),
        });

        await expect(GetAllMonsterDetails()).resolves.toEqual(monsters);
    });

    it('returns an empty array when the API responds with no monsters', async () => {
        (globalThis.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([]),
        });

        await expect(GetAllMonsterDetails()).resolves.toEqual([]);
    });

    it('throws when the response is not ok', async () => {
        (globalThis.fetch as jest.Mock).mockResolvedValue({ ok: false });

        await expect(GetAllMonsterDetails()).rejects.toThrow();
    });

    it('rejects when the network request fails', async () => {
        (globalThis.fetch as jest.Mock).mockRejectedValue(new TypeError('Failed to fetch'));

        await expect(GetAllMonsterDetails()).rejects.toThrow('Failed to fetch');
    });
});
