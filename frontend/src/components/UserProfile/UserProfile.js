import React, { useState, useEffect, useCallback  } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [personalDetails, setPersonalDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState(null);

  // Normalize date function
  const normalizeDate = (date) =>
    date ? new Date(date).toISOString().split('T')[0] : '';

  // Fetch profile data from the backend
  const fetchProfile = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/getProfile/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEducation(
          data.education.map((entry) => ({
            ...entry,
            startDate: normalizeDate(entry.startDate),
            endDate: normalizeDate(entry.endDate),
          }))
        );
        setExperience(
          data.experience.map((entry) => ({
            ...entry,
            startDate: normalizeDate(entry.startDate),
            endDate: normalizeDate(entry.endDate),
          }))
        );
        setProjects(
          data.projects.map((entry) => ({
            ...entry,
            startDate: normalizeDate(entry.startDate),
            endDate: normalizeDate(entry.endDate),
          }))
        );
        setPersonalDetails(data.personalDetails || {});
      } else {
        console.error('Failed to fetch profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }, []);

  // Fetch userId from localStorage and load profile data
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    console.log('Stored userId:', storedUserId);
    if (storedUserId) {
      setUserId(storedUserId);
      fetchProfile(storedUserId);
    }
  }, [fetchProfile]);
  
  

  // Handle changes in personal details
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes in dynamic sections (education, experience, projects)
  const handleDynamicChange = (e, index, sectionSetter, sectionData) => {
    const { name, value, type, checked } = e.target;
    const updatedSection = [...sectionData];
    updatedSection[index][name] = type === 'checkbox' ? checked : value;
    sectionSetter(updatedSection);
  };

  // Add new entry to a section
  const addEntry = (sectionSetter, sectionData) => {
    sectionSetter([...sectionData, {}]);
  };

  // Remove an entry from a section
  const removeEntry = (sectionSetter, sectionData, index) => {
    sectionSetter(sectionData.filter((_, i) => i !== index));
  };

  // Save profile data to the backend
  const handleSave = async () => {
    const payload = { userId, personalDetails, education, experience, projects };
    try {
      const response = await fetch('http://localhost:5000/saveProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert('Profile saved successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('An error occurred while saving the profile.');
    }
  };

  // Render entries dynamically for education, experience, and projects
  const renderEntry = (entry, index, section, setSection, type) => {
    let placeholders = {};
    if (type === 'education') {
      placeholders = { field1: 'Degree', field2: 'Institution' };
    } else if (type === 'experience') {
      placeholders = { field1: 'Job Title', field2: 'Company' };
    } else if (type === 'projects') {
      placeholders = { field1: 'Project Name', field2: 'Technologies' };
    }
  
    return (
      <div key={index} className="entry">
        <div className="entry-header">
          <input
            type="text"
            name={type === 'education' ? 'degree' : type === 'experience' ? 'jobTitle' : 'projectName'}
            value={entry[type === 'education' ? 'degree' : type === 'experience' ? 'jobTitle' : 'projectName'] || ''}
            placeholder={placeholders.field1}
            onChange={(e) => handleDynamicChange(e, index, setSection, section)}
          />
          <input
            type="text"
            name={type === 'education' ? 'institution' : type === 'experience' ? 'company' : 'technologies'}
            value={entry[type === 'education' ? 'institution' : type === 'experience' ? 'company' : 'technologies'] || ''}
            placeholder={placeholders.field2}
            onChange={(e) => handleDynamicChange(e, index, setSection, section)}
          />
          <input
            type="date"
            name="startDate"
            value={entry.startDate || ''}
            onChange={(e) => handleDynamicChange(e, index, setSection, section)}
          />
          {!entry.isPresent && (
            <input
              type="date"
              name="endDate"
              value={entry.endDate || ''}
              onChange={(e) => handleDynamicChange(e, index, setSection, section)}
            />
          )}
          {type !== 'projects' && (
            <label>
              <input
                type="checkbox"
                name="isPresent"
                checked={entry.isPresent || false}
                onChange={(e) => handleDynamicChange(e, index, setSection, section)}
              />
              Currently Working Here
            </label>
          )}
          <button onClick={() => removeEntry(setSection, section, index)}>Remove</button>
        </div>
        <textarea
          name="description"
          value={entry.description || ''}
          placeholder="Description"
          onChange={(e) => handleDynamicChange(e, index, setSection, section)}
        />
      </div>
    );
  };
  

  return (
    <div className="user-profile-container">
      <h1>{personalDetails.fullName || 'User'}'s Profile</h1>

      {/* Personal Details */}
      <section className="section">
        <h2>Personal Details</h2>
        <input
          type="text"
          name="fullName"
          value={personalDetails.fullName}
          placeholder="Full Name"
          onChange={handlePersonalChange}
        />
        <input
          type="email"
          name="email"
          value={personalDetails.email}
          placeholder="Email"
          onChange={handlePersonalChange}
        />
        <input
          type="text"
          name="phone"
          value={personalDetails.phone}
          placeholder="Phone Number"
          onChange={handlePersonalChange}
        />
      </section>

{/* Education */}
<section className="section">
  <h2>Education</h2>
  {education.map((entry, index) =>
    renderEntry(entry, index, education, setEducation, 'education')
  )}
  <button onClick={() => addEntry(setEducation, education)}>+ Add Education</button>
</section>

{/* Experience */}
<section className="section">
  <h2>Experience</h2>
  {experience.map((entry, index) =>
    renderEntry(entry, index, experience, setExperience, 'experience')
  )}
  <button onClick={() => addEntry(setExperience, experience)}>+ Add Experience</button>
</section>

{/* Projects */}
<section className="section">
  <h2>Projects</h2>
  {projects.map((entry, index) =>
    renderEntry(entry, index, projects, setProjects, 'projects')
  )}
  <button onClick={() => addEntry(setProjects, projects)}>+ Add Project</button>
</section>

      <button onClick={handleSave} className="save-button">
        Save Profile
      </button>
    </div>
  );
};

export default UserProfile;
