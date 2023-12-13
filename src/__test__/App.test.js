import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn(),
}));

describe('boundary', () => {
    test('AppComponent boundary renders without crashing', () => {
        render(<App />);
    });

    test('AppComponent boundary has "Welcome to Your Grading Application" h2', () => {
        render(<App />);
        expect(screen.queryByText('Welcome to Your Grading Application')).toBeInTheDocument();
    });

    test('AppComponent boundary has "Add Student" h2', () => {
        render(<App />);
        expect(screen.queryAllByText('Add Student')).toBeTruthy();
    });

    test('AppComponent boundary has "Students List" h2', () => {
        render(<App />);
        expect(screen.queryByText('Students List')).toBeInTheDocument();
    });
});
