import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Hero from './index';
import { GetAllHeroDetails, AllHeroDetails } from './get-all-heroes';

jest.mock('./get-all-heroes', () => ({
    ...jest.requireActual('./get-all-heroes'),
    GetAllHeroDetails: jest.fn(),
}));

const mockedGetAllHeroDetails = GetAllHeroDetails as jest.MockedFunction<typeof GetAllHeroDetails>;

function makeHero(overrides: Partial<AllHeroDetails> = {}): AllHeroDetails {
    return {
        name: 'Aria Nightshade',
        description: 'A hero of the realm',
        book: "Player's Handbook",
        imageFile: 'aria.png',
        coreTraits: {
            primaryAbility: 'Dexterity',
            hitPointDie: 'd8',
            savingThrowProficiencies: 'Dex, Int',
            skillProficiencies: 'Stealth',
            weaponProficiencies: 'Simple',
            toolProficiencies: "Thieves' Tools",
            armorTraining: 'Light',
            startingEquipment: { optionA: 'A', optionB: 'B', optionC: 'C' },
        },
        ...overrides,
    };
}

describe('Hero', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders an empty list with no error when the API returns no heroes', async () => {
        mockedGetAllHeroDetails.mockResolvedValue([]);

        render(<Hero />);

        await waitFor(() => expect(mockedGetAllHeroDetails).toHaveBeenCalled());
        expect(screen.queryByText(/unable to reach the server/i)).not.toBeInTheDocument();
    });

    it('shows an error message when the fetch fails', async () => {
        mockedGetAllHeroDetails.mockRejectedValue(new Error());

        render(<Hero />);

        expect(await screen.findByText('Unable to reach the server. Please try again later.')).toBeInTheDocument();
    });

    it('renders hero cards sorted alphabetically by name', async () => {
        mockedGetAllHeroDetails.mockResolvedValue([
            makeHero({ name: 'Zorak' }),
            makeHero({ name: 'Aria Nightshade' }),
        ]);

        render(<Hero />);

        const names = await screen.findAllByText(/^(Zorak|Aria Nightshade)$/);
        expect(names.map(n => n.textContent)).toEqual(['Aria Nightshade', 'Zorak']);
    });

    it('renders without crashing when coreTraits is missing from the API payload', async () => {
        mockedGetAllHeroDetails.mockResolvedValue([
            { name: 'Broken Hero', description: 'd', book: 'b', imageFile: 'i' },
        ]);

        render(<Hero />);

        expect(await screen.findByText('Broken Hero')).toBeInTheDocument();
    });

    it('encodes special characters in the hero name for the portrait image URL', async () => {
        const name = 'Aria/Nightshade';
        mockedGetAllHeroDetails.mockResolvedValue([makeHero({ name })]);

        render(<Hero />);
        await screen.findByText(name);

        const image = screen.getByAltText('hero-image') as HTMLImageElement;
        expect(image.src).toContain(`/heroes/${encodeURIComponent(name)}/portrait`);
    });

    it('renders no divider before the first hero card and one divider between subsequent cards', async () => {
        mockedGetAllHeroDetails.mockResolvedValue([
            makeHero({ name: 'Aria Nightshade' }),
            makeHero({ name: 'Bram Stonefist' }),
        ]);

        render(<Hero />);
        await screen.findByText('Aria Nightshade');

        expect(document.querySelectorAll('.list-divider')).toHaveLength(1);
    });

    it('renders no divider when there is only one hero card', async () => {
        mockedGetAllHeroDetails.mockResolvedValue([makeHero({ name: 'Aria Nightshade' })]);

        render(<Hero />);
        await screen.findByText('Aria Nightshade');

        expect(document.querySelectorAll('.list-divider')).toHaveLength(0);
    });

    it('filters the hero list as the user types in the search box', async () => {
        mockedGetAllHeroDetails.mockResolvedValue([
            makeHero({ name: 'Aria Nightshade' }),
            makeHero({ name: 'Bram Stonefist' }),
        ]);

        render(<Hero />);
        await screen.findByText('Aria Nightshade');

        fireEvent.change(screen.getByPlaceholderText('Search heroes...'), { target: { value: 'bram' } });

        expect(screen.queryByText('Aria Nightshade')).not.toBeInTheDocument();
        expect(screen.getByText('Bram Stonefist')).toBeInTheDocument();
    });

    it('matches search terms case-insensitively', async () => {
        mockedGetAllHeroDetails.mockResolvedValue([makeHero({ name: 'Aria Nightshade' })]);

        render(<Hero />);
        await screen.findByText('Aria Nightshade');

        fireEvent.change(screen.getByPlaceholderText('Search heroes...'), { target: { value: 'NIGHTSHADE' } });

        expect(screen.getByText('Aria Nightshade')).toBeInTheDocument();
    });

    it('shows no hero cards when the search term matches nothing', async () => {
        mockedGetAllHeroDetails.mockResolvedValue([makeHero({ name: 'Aria Nightshade' })]);

        render(<Hero />);
        await screen.findByText('Aria Nightshade');

        fireEvent.change(screen.getByPlaceholderText('Search heroes...'), { target: { value: 'zzznomatchzzz' } });

        expect(screen.queryByText('Aria Nightshade')).not.toBeInTheDocument();
    });
});
