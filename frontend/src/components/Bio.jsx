import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const Work = ({ magnify }) => {
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Path to the Excel file in the public directory
    const filePath = '/faq.xlsx'; // Ensure the file is in the public folder

    // Function to fetch and parse the Excel file
    const fetchData = async () => {
      try {
        // Fetch the file
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
        }

        // Convert the response to an ArrayBuffer
        const arrayBuffer = await response.arrayBuffer();

        // Parse the Excel file
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // Check if the workbook has a sheet named 'partenaire'
        if (!workbook.SheetNames.includes('partenaire')) {
          throw new Error('No sheet named "partenaire" found in the workbook');
        }

        // Get the 'partenaire' sheet
        const worksheet = workbook.Sheets['partenaire'];

        // Check if the worksheet has data
        if (!worksheet || !worksheet['!ref']) {
          throw new Error('No data found in the "partenaire" sheet');
        }

        // Convert the sheet data to JSON
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Transform the data into an array of { name, description, image } objects
        const partnerItems = data.slice(1).map((row) => ({
          name: row[0],
          description: row[1],
          image: row[2],
        }));

        // Update the state with the partner data
        setPartners(partnerItems);
      } catch (err) {
        console.error('Error fetching or parsing Excel file:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Display an error message if something went wrong
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="work-container">
      {/* Section pour les partenaires */}
      <div className="partners-section">
        <h2 className="section-title">Partenaires</h2>
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div className="partner-card" key={index}>
              <img
                src={partner.image}
                alt={partner.name}
                className="partner-image"
                onClick={() => magnify(partner.image)}
              />
              <div className="partner-info">
                <h3 className="partner-name">{partner.name}</h3>
                <p className="partner-description">{partner.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;