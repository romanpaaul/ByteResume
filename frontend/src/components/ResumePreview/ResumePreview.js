import React from "react";
import { useLocation } from "react-router-dom";
import "./ResumePreview.css";

const ResumePreview = () => {
  const location = useLocation();
  const { formData } = location.state || {};

  if (!formData) {
    return <div>No data available</div>;
  }

  // Funcție pentru sortare cronologică
  const sortChronologically = (items, yearFromField = "yearFrom", yearToField = "yearTo") => {
    return items
      .filter(item => item[yearFromField] || item[yearToField]) // Exclude elementele fără date
      .sort((a, b) => {
        const aTo = a[yearToField] === "Present" ? new Date().getFullYear() : parseInt(a[yearToField], 10) || 0;
        const bTo = b[yearToField] === "Present" ? new Date().getFullYear() : parseInt(b[yearToField], 10) || 0;
        return bTo - aTo; // Sortare descrescătoare
      });
  };

  return (
    <div className="resume-container">
      <aside className="sidebar">
        {formData.personalDetails.profileImage && (
          <div className="profile-picture">
            <img
              src={formData.personalDetails.profileImage}
              alt="Profile"
            />
          </div>
        )}
        <div className="personal-details">
          <h2>Personal Details</h2>
          {formData.personalDetails.fullName && <p><b>Name:</b> {formData.personalDetails.fullName}</p>}
          {formData.personalDetails.email && <p><b>Email:</b> {formData.personalDetails.email}</p>}
          {formData.personalDetails.phone && <p><b>Phone:</b> {formData.personalDetails.phone}</p>}
          {formData.personalDetails.city && formData.personalDetails.country && (
            <p><b>City:</b> {formData.personalDetails.city}, {formData.personalDetails.country}</p>
          )}
        </div>
        {formData.languages.length > 0 && formData.languages.some(lang => lang.language) && (
          <div className="languages">
            <h2>Languages</h2>
            {formData.languages
              .filter(lang => lang.language)
              .map((lang, index) => (
                <p key={index}>
                  {lang.language}: {"★".repeat(lang.stars)}{"☆".repeat(5 - lang.stars)}
                </p>
              ))}
          </div>
        )}
      </aside>
      <main className="main-content">
        <section className="header">
          {formData.personalDetails.fullName && <h1>{formData.personalDetails.fullName}</h1>}
          {formData.personalDetails.professionalTitle && <h3>{formData.personalDetails.professionalTitle}</h3>}
        </section>

        {formData.workExperience.length > 0 && formData.workExperience.some(exp => exp.jobTitle) && (
          <section className="work-experience">
            <h2>Work Experience</h2>
            {sortChronologically(formData.workExperience)
              .map((exp, index) => (
                <div key={index} className="work-entry">
                  <h3>{exp.jobTitle}</h3>
                  <p><b>Company:</b> {exp.company}</p>
                  <p>{exp.yearFrom} - {exp.yearTo}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
          </section>
        )}

        {formData.education.length > 0 && formData.education.some(edu => edu.degree) && (
          <section className="education">
            <h2>Education</h2>
            {sortChronologically(formData.education)
              .map((edu, index) => (
                <div key={index} className="education-entry">
                  <h3>{edu.degree}</h3>
                  <p><b>University:</b> {edu.university}</p>
                  <p>{edu.yearFrom} - {edu.yearTo}</p>
                </div>
              ))}
          </section>
        )}

        {formData.skills.length > 0 && formData.skills.some(skill => skill.skillName) && (
          <section className="skills">
            <h2>Skills</h2>
            {formData.skills
              .filter(skill => skill.skillName)
              .map((skill, index) => (
                <p key={index}>
                  {skill.skillName}: {"★".repeat(skill.stars)}{"☆".repeat(5 - skill.stars)}
                </p>
              ))}
          </section>
        )}

        {formData.projects.length > 0 && formData.projects.some(project => project.projectName) && (
          <section className="projects">
            <h2>Projects</h2>
            {formData.projects
              .filter(project => project.projectName)
              .map((project, index) => (
                <div key={index} className="project-entry">
                  <h3>{project.projectName}</h3>
                  <p><b>Technologies:</b> {project.technologies}</p>
                  <p><b>Description:</b> {project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.link}
                    </a>
                  )}
                </div>
              ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default ResumePreview;
