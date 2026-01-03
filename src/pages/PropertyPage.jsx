import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Standard styles for tabs
import propertiesData from '../data/properties.json';

const PropertyPage = () => {
  const { id } = useParams(); // Get the ID from the URL (e.g. "prop1")
  const property = propertiesData.properties.find(p => p.id === id);

  // State for the main image in the gallery
  const [mainImage, setMainImage] = useState(property ? property.picture : '');

  if (!property) {
    return <div style={{ padding: '20px' }}><h2>Property not found</h2><Link to="/">Back to Search</Link></div>;
  }

  // Use a placeholder images array if the JSON doesn't have multiple images
  const images = property.images || [
      property.picture,
      "https://via.placeholder.com/600x400?text=Bedroom+1",
      "https://via.placeholder.com/600x400?text=Kitchen",
      "https://via.placeholder.com/600x400?text=Living+Room",
      "https://via.placeholder.com/600x400?text=Garden"
  ];

  return (
    <div className="property-page" style={{ maxWidth: '100%', margin: '10%', padding: '20px', marginTop: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      
      {/* Back Button */}
      <Link to="/" style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>&larr; Back to Search</Link>

      <h1 style={{ marginTop: '10px' }}>{property.type} in {property.location}</h1>
      <h2 style={{ color: '#27ae60' }}>£{property.price.toLocaleString()}</h2>

      {/* GALLERY SECTION [cite: 104] */}
      <div className="gallery" style={{ marginTop: '20px' }}>
        <div className="main-image" style={{ marginBottom: '10px' }}>
            <img src={mainImage} alt="Main" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '8px' }} />
        </div>
        <div className="thumbnails" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
            {images.map((img, index) => (
                <img 
                    key={index} 
                    src={img} 
                    alt={`Thumb ${index}`} 
                    onClick={() => setMainImage(img)}
                    style={{ 
                        width: '100px', 
                        height: '80px', 
                        objectFit: 'cover', 
                        cursor: 'pointer', 
                        border: mainImage === img ? '3px solid #3498db' : '1px solid #ccc',
                        borderRadius: '4px'
                    }} 
                />
            ))}
        </div>
      </div>

      {/* TABS SECTION [cite: 106] */}
      <div style={{ marginTop: '30px' }}>
        <Tabs>
            <TabList>
                <Tab>Description</Tab>
                <Tab>Floor Plan</Tab>
                <Tab>Map</Tab>
            </TabList>

            <TabPanel>
                <h3>Property Description</h3>
                <p style={{ lineHeight: '1.6', color: '#555' }}>{property.description}</p>
                <ul style={{ marginTop: '10px', color: '#666' }}>
                    <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
                    <li><strong>Tenure:</strong> {property.tenure}</li>
                    <li><strong>Added:</strong> {property.added.month} {property.added.day}, {property.added.year}</li>
                </ul>
            </TabPanel>
            
            <TabPanel>
                <div style={{ textAlign: 'center', padding: '20px', background: '#f9f9f9' }}>
                    <img src="https://via.placeholder.com/600x400?text=Floor+Plan+Placeholder" alt="Floorplan" style={{ maxWidth: '100%' }} />
                    <p>Interactive floor plan not available for this demo.</p>
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