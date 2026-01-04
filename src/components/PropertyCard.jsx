import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';

const PropertyCard = ({ property, onAddToFavorites }) => {
    const { id, type, price, location, picture, bedrooms, tenure, added } = property;

    // Setup Drag Source Logic
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'PROPERTY',
        item: { property },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={dragRef}
            className="property-card"
            style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
        >
            <div className="card-image">
                <img
                    src={`/${picture}`}
                    alt={type}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                />
            </div>

            <div className="card-details">
                <div className="card-header">
                    <h3>{type}</h3>
                    <span className="badge">{bedrooms} Beds</span>
                </div>

                <p className="price">£{price.toLocaleString()}</p>
                <p className="location">📍 {location}</p>

                <div className="card-meta">
                    <span>{added.month} {added.day}, {added.year}</span>
                    <span>{tenure}</span>
                </div>

                <div className="card-actions">
                    <Link to={`/property/${id}`} className="view-btn-link">
                        <button className="view-btn">View Details</button>
                    </Link>

                    {/* Heart Button for Click-to-Favorite */}
                    <button
                        className="fav-btn"
                        onClick={() => onAddToFavorites(property)}
                        title="Add to Favorites"
                    >
                        ❤
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;