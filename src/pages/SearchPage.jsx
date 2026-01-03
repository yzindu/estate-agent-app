import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import PropertyCard from '../components/PropertyCard';
import FavoritesList from '../components/Favorites';
import propertiesData from '../data/properties.json';

const SearchPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favorites, setFavorites] = useState([]); // State for Favorites   

  // Load Data
  useEffect(() => {
    setProperties(propertiesData.properties);
    setFilteredProperties(propertiesData.properties);
  }, []);

  // --- FAVORITES LOGIC ---
  const handleAddToFavorites = (property) => {
    // Check if already in favorites to prevent duplicates
    if (!favorites.some(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    } else {
      alert("This property is already in your favorites!");
    }
  };

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const handleClearFavorites = () => {
    setFavorites([]);
  };

  // --- SEARCH LOGIC ---
  const getMonthNum = (monthName) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.indexOf(monthName);
  };

  const handleSearch = (criteria) => {
    const results = properties.filter(property => {
      if (criteria.type !== 'Any' && property.type !== criteria.type) return false;
      if (criteria.minPrice && property.price < Number(criteria.minPrice)) return false;
      if (criteria.maxPrice && property.price > Number(criteria.maxPrice)) return false;
      if (criteria.minBeds && property.bedrooms < Number(criteria.minBeds)) return false;
      if (criteria.maxBeds && property.bedrooms > Number(criteria.maxBeds)) return false;
      if (criteria.postcode && !property.location.toLowerCase().includes(criteria.postcode.toLowerCase())) return false;

      const propDate = new Date(property.added.year, getMonthNum(property.added.month), property.added.day);
      if (criteria.dateAfter && propDate < new Date(criteria.dateAfter)) return false;
      if (criteria.dateBefore && propDate > new Date(criteria.dateBefore)) return false;

      return true;
    });
    setFilteredProperties(results);
  };

  return (
    <div className="search-page-container">
      {/* LEFT COLUMN: Search & Results */}
      <div className="main-content">
        <SearchBox onSearch={handleSearch} />

        <div className="results-info">
          {filteredProperties.length === 0 ? "No properties found." : `Found ${filteredProperties.length} properties:`}
        </div>

        <div className="property-grid">
          {filteredProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onAddToFavorites={handleAddToFavorites} // Pass function down
            />
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Favorites Sidebar */}
      <div className="sidebar">
        <FavoritesList
          favorites={favorites}
          onRemove={handleRemoveFavorite}
          onClear={handleClearFavorites}
        />
      </div>
    </div>
  );
};

export default SearchPage;