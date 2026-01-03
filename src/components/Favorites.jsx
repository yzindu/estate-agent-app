import React from 'react';
import { useDrop } from 'react-dnd';

const Favorites = ({ favorites, onRemove, onClear }) => {
  // Setup Drop Target Logic
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'PROPERTY', // Must match the type in PropertyCard
    drop: (item) => item.onDrop(item.id), // Call the function passed from the card
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={dropRef}
      className="favorites-list"
      style={{
        backgroundColor: isOver ? '#dff9fb' : 'white',
        border: isOver ? '2px dashed #3498db' : '1px solid #ddd'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0 }}>Favorites ({favorites.length})</h3>
        {favorites.length > 0 && (
          <button onClick={onClear} className="clear-btn">Clear All</button>
        )}
      </div>

      {favorites.length === 0 ? (
        <p style={{ color: '#999', fontStyle: 'italic', textAlign: 'center', padding: '20px 0' }}>
          Drag properties here to shortlist them...
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {favorites.map(fav => (
            <li key={fav.id} className="fav-item">
              <img src={fav.picture} alt="thumb" />
              <div className="fav-info">
                <h4>{fav.type}</h4>
                <p>£{fav.price.toLocaleString()}</p>
              </div>
              <button onClick={() => onRemove(fav.id)} className="remove-btn">×</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;