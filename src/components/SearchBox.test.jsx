import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from './SearchBox';

/* Test Cases */
describe('SearchBox Component',() => {
    // test case 01 : check user inputs works
    it('allows typing in the postcode field', async () => {
        const user = userEvent.setup();
        render(<SearchBox onSearch={() => { }} />);

        const postcodeInput = screen.getByPlaceholderText(/e.g. BR1/i);

        // Simulate user typing "SE15"
        await user.type(postcodeInput, 'SE15');

        // Verify the value updated
        expect(postcodeInput).toHaveValue('SE15');
    });

    // test case 02 : check search button works
    it('Calls on search with correct parameters when Search button is clicked', async () => {
        const user = userEvent.setup();
        const mockOnSearch = vi.fn();

        render(<SearchBox onSearch={mockOnSearch} />);
        const searchButton = screen.getByRole('button', { name: /Search/i });

        // Simulate clicking the search button
        await user.click(searchButton); 
        // Verify onSearch called with default parameters
        expect(mockOnSearch).toHaveBeenCalledWith({
            type: 'Any',
            postcode: '',
            minPrice: '',
            maxPrice: '',
            minBeds: '',
            maxBeds: '',
            dateAfter: '',
            dateBefore: ''
        });
    });

    // test case 03 : check negative scenario for price range
    it('shows alert if negative price is entered', async () => {
        const user = userEvent.setup();
        const mockOnSearch = vi.fn(); 
        
        window.alert = vi.fn(); 

        render(<SearchBox onSearch={mockOnSearch} />);

        // Find min price input (assuming it's the first input with '0' placeholder)
        const inputs = screen.getAllByPlaceholderText('0');
        const minPriceInput = inputs[0]; 

        // Type a negative number
        await user.type(minPriceInput, '-500');

        // Click Search
        await user.click(screen.getByRole('button', { name: /Search/i }));

        // Check that alert happened and search DID NOT happen
        expect(window.alert).toHaveBeenCalled();
        expect(mockOnSearch).not.toHaveBeenCalled();
    });


});
