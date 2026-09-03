import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Header from './index';

function renderHeader() {
    return render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
}

describe('Header', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('disables the dragon-eye button on click and re-enables it after the timeout', () => {
        renderHeader();
        const button = screen.getByRole('button');

        fireEvent.click(button);
        expect(button).toBeDisabled();

        act(() => {
            jest.advanceTimersByTime(900);
        });

        expect(button).not.toBeDisabled();
    });

    it('toggles the dragon-eye image between opening and closing states on click', () => {
        renderHeader();
        const image = screen.getByAltText('dragons-eye') as HTMLImageElement;
        const initialSrc = image.src;

        fireEvent.click(screen.getByRole('button'));

        expect(image.src).not.toBe(initialSrc);
    });

    it('clears the pending re-enable timeout when unmounted before it fires', () => {
        const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
        const { unmount } = renderHeader();

        fireEvent.click(screen.getByRole('button'));
        unmount();

        expect(clearTimeoutSpy).toHaveBeenCalled();

        clearTimeoutSpy.mockRestore();
    });
});
