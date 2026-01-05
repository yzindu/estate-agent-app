import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import { DndProvider } from 'react-dnd';        
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropertyCard from './PropertyCard';

describe('PropertyCard Component', () => {

    // Create dummy data for the test
    const mockProperty = {
        id: "prop1",
        type: "Super Luxury Flat",
        price: 450000,
        location: "London",
        bedrooms: 3,
        tenure: "Freehold",
        picture: "images/prop1.jpg",
        added: { month: "January", day: 12, year: 2025 }
    };

    // Test 5: Check if property details render correctly
    
    it('displays the correct property details', () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <MemoryRouter>
                    <PropertyCard property={mockProperty} onAddToFavorites={() => { }} />
                </MemoryRouter>
            </DndProvider>
        );

        // Check if the specific text from our dummy data appears
        expect(screen.getByText("Super Luxury Flat")).toBeInTheDocument();
        expect(screen.getByText("£450,000")).toBeInTheDocument(); // Checks formatting too!
        expect(screen.getByText(/London/i)).toBeInTheDocument();
        expect(screen.getByText("3 Beds")).toBeInTheDocument();
    });
});