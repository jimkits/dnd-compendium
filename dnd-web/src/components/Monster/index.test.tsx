import { render, screen, waitFor } from '@testing-library/react';
import Monster from './index';
import { GetAllMonsterDetails, MonstersDetails } from './get-all-monsters';

jest.mock('./get-all-monsters', () => ({
    ...jest.requireActual('./get-all-monsters'),
    GetAllMonsterDetails: jest.fn(),
}));

const mockedGetAllMonsterDetails = GetAllMonsterDetails as jest.MockedFunction<typeof GetAllMonsterDetails>;

function makeMonster(overrides: Partial<MonstersDetails> = {}): MonstersDetails {
    return {
        name: 'Ancient Wyrm',
        description: 'A fearsome dragon',
        stats: { armorClass: '20', hitPoints: '200', speed: '40 ft' },
        attributes: { strength: '25', dexterity: '10', constitution: '22', intelligence: '16', wisdom: '14', charisma: '18' },
        ...overrides,
    };
}

describe('Monster', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders an empty list with no error when the API returns no monsters', async () => {
        mockedGetAllMonsterDetails.mockResolvedValue([]);

        render(<Monster />);

        await waitFor(() => expect(mockedGetAllMonsterDetails).toHaveBeenCalled());
        expect(screen.queryByText(/unable to reach the server/i)).not.toBeInTheDocument();
    });

    it('shows an error message when the fetch fails', async () => {
        mockedGetAllMonsterDetails.mockRejectedValue(new Error());

        render(<Monster />);

        expect(await screen.findByText('Unable to reach the server. Please try again later.')).toBeInTheDocument();
    });

    it('renders monster cards sorted alphabetically by name', async () => {
        mockedGetAllMonsterDetails.mockResolvedValue([
            makeMonster({ name: 'Zombie' }),
            makeMonster({ name: 'Ancient Wyrm' }),
        ]);

        render(<Monster />);

        const headings = await screen.findAllByRole('heading', { level: 1, name: /^(Zombie|Ancient Wyrm)$/ });
        expect(headings.map(h => h.textContent)).toEqual(['Ancient Wyrm', 'Zombie']);
    });

    it('renders without crashing when stats and attributes are missing from the API payload', async () => {
        mockedGetAllMonsterDetails.mockResolvedValue([
            { name: 'Broken Monster', description: 'd' },
        ]);

        render(<Monster />);

        expect(await screen.findByText('Broken Monster')).toBeInTheDocument();
    });

    it('renders no divider before the first monster card and one divider between subsequent cards', async () => {
        mockedGetAllMonsterDetails.mockResolvedValue([
            makeMonster({ name: 'Ancient Wyrm' }),
            makeMonster({ name: 'Zombie' }),
        ]);

        render(<Monster />);
        await screen.findByText('Ancient Wyrm');

        expect(document.querySelectorAll('.list-divider')).toHaveLength(1);
    });

    it('renders no divider when there is only one monster card', async () => {
        mockedGetAllMonsterDetails.mockResolvedValue([makeMonster({ name: 'Ancient Wyrm' })]);

        render(<Monster />);
        await screen.findByText('Ancient Wyrm');

        expect(document.querySelectorAll('.list-divider')).toHaveLength(0);
    });
});
