import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  // 1. State for all filter criteria
  const [type, setType] = useState('Any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBeds, setMinBeds] = useState('');
  const [maxBeds, setMaxBeds] = useState('');
  const [postcode, setPostcode] = useState('');
  
  // Date Logic: "After" and "Between" support
  const [dateAfter, setDateAfter] = useState(''); 
  const [dateBefore, setDateBefore] = useState('');

  // 2. Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass all values up to the SearchPage
    onSearch({ 
        type, 
        minPrice, maxPrice, 
        minBeds, maxBeds, 
        postcode,
        dateAfter, dateBefore
    });
  };

  const handleClearFilters = () => {
    setType('Any');
    setMinPrice('');
    setMaxPrice('');
    setMinBeds('');
    setMaxBeds(''); 
    setPostcode('');
    setDateAfter('');
    setDateBefore('');
    // Trigger search with cleared filters
    onSearch({ 
        type: 'Any',
        minPrice: '', maxPrice: '',
        minBeds: '', maxBeds: '',
        postcode: '',
        dateAfter: '', dateBefore: ''
    });
  }

  return (
    <div className="search-box" style={
        { background: '#2c3e50', 
            padding: '20px', 
            borderRadius: '8px', 
            marginBottom: '20px', 
            color: 'white' 
        }
        }>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            
            {/* Property Type */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Type</label>
                <select value={type} onChange={e => setType(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: 'none' }}>
                    <option value="Any">Any</option>
                    <option value="House">House</option>
                    <option value="Flat">Flat</option>
                </select>
            </div>

            {/* Price Range */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Min Price</label>
                <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} style={{ padding: '8px', width: '80px', borderRadius: '4px', border: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Max Price</label>
                <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} style={{ padding: '8px', width: '80px', borderRadius: '4px', border: 'none' }} />
            </div>

            {/* Bedrooms Range */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Min Beds</label>
                <input type="number" placeholder="0" value={minBeds} onChange={e => setMinBeds(e.target.value)} style={{ padding: '8px', width: '60px', borderRadius: '4px', border: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Max Beds</label>
                <input type="number" placeholder="10" value={maxBeds} onChange={e => setMaxBeds(e.target.value)} style={{ padding: '8px', width: '60px', borderRadius: '4px', border: 'none' }} />
            </div>

            {/* Postcode */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Postcode</label>
                <input type="text" placeholder="e.g. BR1" value={postcode} onChange={e => setPostcode(e.target.value)} style={{ padding: '8px', width: '100px', borderRadius: '4px', border: 'none' }} />
            </div>

            {/* Date Added Filter */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Added After</label>
                <input type="date" value={dateAfter} onChange={e => setDateAfter(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Added Before</label>
                <input type="date" value={dateBefore} onChange={e => setDateBefore(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: 'none' }} />
            </div>

            {/* Search Button */}
            <button type="submit" style={{ padding: '10px 25px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                Search
            </button>

            {/* Clear Filters Button */}
            <button type="button" onClick={handleClearFilters} style={{ padding: '10px 25px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                Clear Filters
            </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;