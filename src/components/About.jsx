import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const About = () => {
  const [faqData, setFaqData] = useState([]);
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

        // Check if the workbook has a sheet named 'faq'
        if (!workbook.SheetNames.includes('faq')) {
          throw new Error('No sheet named "faq" found in the workbook');
        }

        // Get the 'faq' sheet
        const worksheet = workbook.Sheets['faq'];

        // Check if the worksheet has data
        if (!worksheet || !worksheet['!ref']) {
          throw new Error('No data found in the "faq" sheet');
        }

        // Convert the sheet data to JSON
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Transform the data into an array of { question, answer } objects
        const faqItems = data.slice(1).map((row) => ({
          question: row[0],
          answer: row[1],
        })); 
        console.log(faqItems)
        // Update the state with the FAQ data
        setFaqData(faqItems);
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

  // Render the FAQ section
  return (
    <div id="faq-section">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;