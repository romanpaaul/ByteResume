import React, { useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [personalDetails, setPersonalDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const [education, setEducation] = useState([
    { degree: '', institution: '', startDate: '', endDate: '', description: '', isPresent: false },
  ]);

  const [experience, setExperience] = useState([
    { jobTitle: '', company: '', startDate: '', endDate: '', description: '', isPresent: false },
  ]);

  const [projects, setProjects] = useState([
    { projectName: '', technologies: '', startDate: '', endDate: '', description: '' },
  ]);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDynamicChange = (e, index, section) => {
    const { name, value, type, checked } = e.target;
    const updatedData = [...section];
    updatedData[index][name] = type === 'checkbox' ? checked : value;
    section === education
      ? setEducation(updatedData)
      : section === experience
      ? setExperience(updatedData)
      : setProjects(updatedData);
  };

  const addEntry = (setter, section) => setter([...section, {}]);
  const removeEntry = (setter, section, index) => setter(section.filter((_, i) => i !== index));

  const renderEntry = (entry, index, section, setSection, isExperienceOrEducation = false) => (
    <div key={index} className="entry">
      <div className="entry-header">
        <input
          type="text"
          name={section === projects ? 'projectName' : isExperienceOrEducation ? 'jobTitle' : 'degree'}
          value={entry[section === projects ? 'projectName' : isExperienceOrEducation ? 'jobTitle' : 'degree']}
          placeholder={section === projects ? 'Project Name' : isExperienceOrEducation ? 'Job Title' : 'Degree'}
          onChange={(e) => handleDynamicChange(e, index, section)}
        />
        <input
          type="text"
          name={section === projects ? 'technologies' : isExperienceOrEducation ? 'company' : 'institution'}
          value={entry[section === projects ? 'technologies' : isExperienceOrEducation ? 'company' : 'institution']}
          placeholder={section === projects ? 'Technologies' : isExperienceOrEducation ? 'Company' : 'Institution'}
          onChange={(e) => handleDynamicChange(e, index, section)}
        />
        <input
          type="date"
          name="startDate"
          value={entry.startDate}
          onChange={(e) => handleDynamicChange(e, index, section)}
        />
        {!entry.isPresent && (
          <input
            type="date"
            name="endDate"
            value={entry.endDate}
            onChange={(e) => handleDynamicChange(e, index, section)}
          />
        )}
        {isExperienceOrEducation && (
          <label>
            <input
              type="checkbox"
              name="isPresent"
              checked={entry.isPresent}
              onChange={(e) => handleDynamicChange(e, index, section)}
            />
            Currently {section === experience ? 'Working Here' : 'Studying Here'}
          </label>
        )}
        <span className="remove-entry" onClick={() => removeEntry(setSection, section, index)}>
          Remove
        </span>
      </div>
      <textarea
        name="description"
        value={entry.description}
        placeholder="Description"
        onChange={(e) => handleDynamicChange(e, index, section)}
      />
    </div>
  );

  return (
    <div className="user-profile-container">
      <h1>{personalDetails.fullName || 'User'}'s Profile</h1>

      {/* Personal Details Section */}
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

      {/* Education Section */}
      <section className="section">
        <h2>Education</h2>
        {education.map((entry, index) =>
          renderEntry(entry, index, education, setEducation, true)
        )}
        <button onClick={() => addEntry(setEducation, education)}>+ Add Education</button>
      </section>

      {/* Experience Section */}
      <section className="section">
        <h2>Experience</h2>
        {experience.map((entry, index) =>
          renderEntry(entry, index, experience, setExperience, true)
        )}
        <button onClick={() => addEntry(setExperience, experience)}>+ Add Experience</button>
      </section>

      {/* Projects Section */}
      <section className="section">
        <h2>Projects</h2>
        {projects.map((entry, index) => renderEntry(entry, index, projects, setProjects))}
        <button onClick={() => addEntry(setProjects, projects)}>+ Add Project</button>
      </section>
    </div>
  );
};

export default UserProfile;
