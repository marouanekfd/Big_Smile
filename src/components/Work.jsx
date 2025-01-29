import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const Work = ({ magnify }) => {
  const [ongoingProjects, setOngoingProjects] = useState([]); // Projets en cours
  const [completedProjects, setCompletedProjects] = useState([]); // Projets réalisés
  const [error, setError] = useState(null);

  useEffect(() => {
    // Path to the Excel file in the public directory
    const filePath = '/faq.xlsx'; // Assurez-vous que le fichier est dans le dossier public

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

        // Check if the workbook has the required sheets
        if (!workbook.SheetNames.includes('projet_en_cours') || !workbook.SheetNames.includes('projet_realises')) {
          throw new Error('Required sheets "projet_en_cours" or "projet_realises" not found in the workbook');
        }

        // Get the 'projet_en_cours' sheet
        const ongoingSheet = workbook.Sheets['projet_en_cours'];
        // Get the 'projet_realises' sheet
        const completedSheet = workbook.Sheets['projet_realises'];

        // Check if the sheets have data
        if (!ongoingSheet || !ongoingSheet['!ref'] || !completedSheet || !completedSheet['!ref']) {
          throw new Error('No data found in the required sheets');
        }

        // Convert the sheet data to JSON
        const ongoingData = XLSX.utils.sheet_to_json(ongoingSheet, { header: 1 });
        const completedData = XLSX.utils.sheet_to_json(completedSheet, { header: 1 });

        // Transform the data into an array of { name, description, image } objects
        const ongoingProjectsData = ongoingData.slice(1).map((row) => ({
          name: row[0],
          description: row[1],
          image: row[2],
        }));

        const completedProjectsData = completedData.slice(1).map((row) => ({
          name: row[0],
          description: row[1],
          image: row[2],
        }));

        // Update the state with the project data
        setOngoingProjects(ongoingProjectsData);
        setCompletedProjects(completedProjectsData);
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
      {/* Section pour les projets en cours */}
      <div className="projects-section">
        <h2 className="section-title">Projets en cours</h2>
        <div className="projects-grid">
          {ongoingProjects.map((project, index) => (
            <div className="partner-card" key={index}>
              <img
                src={project.image}
                alt={project.name}
                className="partner-image"
                onClick={() => magnify(project.image)}
              />
              <div className="partner-info">
                <h3 className="partner-name">{project.name}</h3>
                <p className="partner-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section pour les projets réalisés */}
      <div className="projects-section">
        <h2 className="section-title">Projets réalisés</h2>
        <div className="projects-grid">
          {completedProjects.map((project, index) => (
            <div className="partner-card" key={index}>
              <img
                src={project.image}
                alt={project.name}
                className="partner-image"
                onClick={() => magnify(project.image)}
              />
              <div className="partner-info">
                <h3 className="partner-name">{project.name}</h3>
                <p className="partner-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;