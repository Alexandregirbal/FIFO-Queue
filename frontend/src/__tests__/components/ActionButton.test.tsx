import { render, screen } from '@testing-library/react';
import ActionButton from '../../components/ActionButton';

describe('ActionButton component', () => {
    test('ActionButton component renders as expected with good props', () => {
    render(<ActionButton
        action={'T'}
        creditsLeft={10}
        onClick={() => {}}
    />);
    const labelElement = screen.getByRole("button", { name: "T" });  
    expect(labelElement).toBeInTheDocument();

    const creditsElement = screen.getByText("10");  
    expect(creditsElement).toBeInTheDocument();
    });
});
