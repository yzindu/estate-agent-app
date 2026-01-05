import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Standard styles for tabs
import propertiesData from '../data/properties.json';
import DOMPurify from 'dompurify';

const PropertyPage = () => {
    const { id } = useParams(); // Get the ID from the URL
    const property = propertiesData.properties.find(p => p.id === id);

    // State for the main image in the gallery
    const [mainImage, setMainImage] = useState(property ? `/${property.picture}` : '');

    if (!property) {
        return <div style={{ padding: '20px' }}><h2>Property not found</h2><Link to="/">Back to Search</Link></div>;
    }

    // Use a placeholder images array
    const images = [
        `${import.meta.env.BASE_URL}${property.picture}`,  // Main image
        `${import.meta.env.BASE_URL}images/${id}_1.jpg`,    // Additional images
        `${import.meta.env.BASE_URL}images/${id}_2.jpg`,
        `${import.meta.env.BASE_URL}images/${id}_3.jpg`,
        `${import.meta.env.BASE_URL}images/${id}_2.jpg`,
        `${import.meta.env.BASE_URL}images/${id}_3.jpg`,
        `${import.meta.env.BASE_URL}images/${id}_4.jpg`,
        `${import.meta.env.BASE_URL}images/${id}_5.jpg`,
        `${import.meta.env.BASE_URL}images/${id}_6.jpg`
    ];

    return (
        <div className="property-page" style={{ maxWidth: '100%', margin: '10%', padding: '20px', marginTop: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>

            {/* Back Button */}
            <Link to="/" style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>&larr; Back to Search</Link>

            <h1 style={{ marginTop: '10px' }}>{property.type} in {property.location}</h1>
            <h2 style={{ color: '#27ae60' }}>£{property.price.toLocaleString()}</h2>

            {/* GALLERY SECTION */}
            <div className="gallery-container">
                {/* Main Large Image */}
                <div className="main-image-wrapper" style={{ height: '500px', backgroundColor: '#eee', borderRadius: '8px', overflow: 'hidden', marginBottom: '15px' }}>
                    <img
                        src={mainImage}
                        alt="Main View"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/800x500?text=Image+Not+Found'; }}
                    />
                </div>

                {/* Thumbnails Row */}
                <div className="thumbnails-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                    {images.map((img, index) => (
                        <div
                            key={index}
                            onClick={() => setMainImage(img)}
                            style={{
                                height: '80px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                border: mainImage === img ? '3px solid #3498db' : '2px solid transparent',
                                opacity: mainImage === img ? 1 : 0.7
                            }}
                        >
                            <img
                                src={img}
                                alt={`View ${index}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => { e.target.style.display = 'none'; }} // Hide thumbnail if file missing
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* TABS SECTION */}
            <div style={{ marginTop: '30px' }}>
                <Tabs>
                    <TabList>
                        <Tab>Description</Tab>
                        <Tab>Floor Plan</Tab>
                        <Tab>Map</Tab>
                    </TabList>

                    <TabPanel>
                        <h3>Property Description</h3>
                        <div style={{ lineHeight: '1.8', color: '#555', fontSize: '1.1rem' }}
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(property.description)
                            }}
                        />
                        <ul style={{ marginTop: '10px', color: '#666' }}>
                            <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
                            <li><strong>Tenure:</strong> {property.tenure}</li>
                            <li><strong>Added:</strong> {property.added.month} {property.added.day}, {property.added.year}</li>
                        </ul>
                    </TabPanel>

                    <TabPanel>
                        <div style={{ textAlign: 'center', padding: '20px', background: '#f9f9f9' }}>
                            <img src={`${import.meta.env.BASE_URL}images/floor${property.id.replace('prop', '')}.jpg`} style={{ maxWidth: '100%' }} />
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div style={{ width: '100%', height: '400px', background: '#eee' }}>
                            <iframe
                                title="Google Map"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={`https://www.google.com/maps?q=${property.location}&output=embed`}
                                allowFullScreen
                            ></iframe>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default PropertyPage;