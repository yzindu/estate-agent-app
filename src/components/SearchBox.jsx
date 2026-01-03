import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
    // 1. State
    const [type, setType] = useState('Any');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minBeds, setMinBeds] = useState('');
    const [maxBeds, setMaxBeds] = useState('');
    const [postcode, setPostcode] = useState('');
    const [dateAfter, setDateAfter] = useState('');
    const [dateBefore, setDateBefore] = useState('');

    // 2. Handlers
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({
            type, minPrice, maxPrice, minBeds, maxBeds, postcode, dateAfter, dateBefore
        });
    };

    const handleClear = () => {
        setType('Any');
        setMinPrice(''); setMaxPrice('');
        setMinBeds(''); setMaxBeds('');
        setPostcode('');
        setDateAfter(''); setDateBefore('');

        onSearch({
            type: 'Any', minPrice: '', maxPrice: '',
            minBeds: '', maxBeds: '', postcode: '',
            dateAfter: '', dateBefore: ''
        });
    };

    return (
        <div className="search-box">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#333' }}>Search Properties</h2>
            <form onSubmit={handleSubmit} className="search-grid">

                {/* Row 1 */}
                <div className="form-group">
                    <label>Type</label>
                    <select value={type} onChange={e => setType(e.target.value)}>
                        <option value="Any">Any</option>
                        <option value="House">House</option>
                        <option value="Flat">Flat</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Postcode Area</label>
                    <input type="text" placeholder="e.g. BR1" value={postcode} onChange={e => setPostcode(e.target.value)} />
                </div>

                {/* Row 2 */}
                <div className="form-group">
                    <label>Min Price (£)</label>
                    <input type="number" placeholder="0" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Max Price (£)</label>
                    <input type="number" placeholder="0" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                </div>

                {/* Row 3 */}
                <div className="form-group">
                    <label>Min Bedrooms</label>
                    <input type="number" placeholder="0" value={minBeds} onChange={e => setMinBeds(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Max Bedrooms</label>
                    <input type="number" placeholder="0" value={maxBeds} onChange={e => setMaxBeds(e.target.value)} />
                </div>

                {/* Row 4 */}
                <div className="form-group">
                    <label>Added From</label>
                    <input type="date" value={dateAfter} onChange={e => setDateAfter(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Added To</label>
                    <input type="date" value={dateBefore} onChange={e => setDateBefore(e.target.value)} />
                </div>

                {/* Buttons (Span full width) */}
                <div className="button-group">
                    <button type="submit" className="search-btn">Search</button>
                    <button type="button" onClick={handleClear} className="clear-btn">Clear Filters</button>
                </div>
            </form>
        </div>
    );
};

export default SearchBox;