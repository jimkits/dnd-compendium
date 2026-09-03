import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/Header', () => () => <div>Header</div>);
jest.mock('./components/Navigation', () => () => <div>Navigation</div>);
jest.mock('./components/Home', () => () => <div>Home Page</div>);
jest.mock('./components/Hero', () => () => <div>Hero Page</div>);
jest.mock('./components/Monster', () => () => <div>Monster Page</div>);

function renderAtPath(path: string) {
    window.history.pushState({}, '', path);
    return render(<App />);
}

describe('App routing', () => {
    it('renders Home at /', () => {
        renderAtPath('/');
        expect(screen.getByText('Home Page')).toBeInTheDocument();
    });

    it('renders Hero at /hero', () => {
        renderAtPath('/hero');
        expect(screen.getByText('Hero Page')).toBeInTheDocument();
    });

    it('renders Monster at /monster', () => {
        renderAtPath('/monster');
        expect(screen.getByText('Monster Page')).toBeInTheDocument();
    });

    it('redirects unknown paths to Home', () => {
        renderAtPath('/does-not-exist');
        expect(screen.getByText('Home Page')).toBeInTheDocument();
    });
});
