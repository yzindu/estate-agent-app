import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import propertiesData from '../data/properties.json';
import DOMPurify from 'dompurify';

const PropertyPage = () => {
    const { id } = useParams();
    const property = propertiesData.properties.find(p => p.id === id);

    // State for the main image
    const [mainImage, setMainImage] = useState(property ? `${import.meta.env.BASE_URL}${property.picture}` : '');

    if (!property) {
        return <div style={{ padding: '40px', textAlign: 'center' }}><h2>Property not found</h2><Link to="/">Back to Search</Link></div>;
    }

    const images = [
        `${import.meta.env.BASE_URL}${property.picture}`,
        `${import.meta.env.BASE_URL}images/${id}_1.jpg`,
        `${import.meta.env.BASE_URL}images/${id}_2.jpg`,
        `${import.meta.env.BASE_URL}images/${id}_3.jpg`,
        `${import.meta.env.BASE_URL}images/${id}_4.jpg`,
        `${import.meta.env.BASE_URL}images/${id}_5.jpg`,
        `${import.meta.env.BASE_URL}images/${id}_6.jpg`
    ];

    return (
        <div className="property-page-container">

            {/* Back Button */}
            <Link to="/" className="back-link">← Back to Search</Link>

            <h1 className="property-title">{property.type} in {property.location}</h1>
            <h2 className="property-price">£{property.price.toLocaleString()}</h2>

            {/* GALLERY SECTION */}
            <div className="gallery-container">
                {/* Main Large Image */}
                <div className="main-image-wrapper">
                    <img
                        src={mainImage}
                        alt="Main View"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/800x500?text=Image+Not+Found'; }}
                    />
                </div>

                {/* Thumbnails Row */}
                <div className="thumbnails-row">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="thumbnail-box"
                            onClick={() => setMainImage(img)}
                            style={{
                                border: mainImage === img ? '3px solid #3498db' : '2px solid transparent',
                                opacity: mainImage === img ? 1 : 0.7
                            }}
                        >
                            <img
                                src={img}
                                alt={`View ${index}`}
                                onError={(e) => { e.target.style.display = 'none'; }}
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
                        <div
                            style={{ lineHeight: '1.8', color: '#555', fontSize: '1.1rem' }}
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(property.description)
                            }}
                        />
                        <ul style={{ marginTop: '20px', color: '#666', listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '8px' }}><strong>🛏 Bedrooms:</strong> {property.bedrooms}</li>
                            <li style={{ marginBottom: '8px' }}><strong>📅 Tenure:</strong> {property.tenure}</li>
                            <li style={{ marginBottom: '8px' }}><strong>🕒 Added:</strong> {property.added.month} {property.added.day}, {property.added.year}</li>
                        </ul>
                    </TabPanel>

                    <TabPanel>
                        <div style={{ textAlign: 'center', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
                            <img
                                src={`${import.meta.env.BASE_URL}images/floor${property.id.replace('prop', '')}.jpg`}
                                style={{ maxWidth: '100%', height: 'auto' }}
                                alt="Floor Plan"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div style={{ width: '100%', height: '400px', background: '#eee', borderRadius: '8px', overflow: 'hidden' }}>
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