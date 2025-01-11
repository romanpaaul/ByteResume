import React, { useState } from "react";
import "./ResumeBuild.css";
import { useNavigate } from "react-router-dom";

const ResumeBuild = () => {
  const [formData, setFormData] = useState({
    personalDetails: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      professionalTitle: "", 
      profileImage: "", // Adăugăm un câmp pentru imagine
    },
    education: [{ degree: "", university: "", yearFrom: "", yearTo: "" }],
    workExperience: [
      { jobTitle: "", company: "", yearFrom: "", yearTo: "", description: "" },
    ],
    skills: [{ skillName: "", proficiency: "" }],
    projects: [
      { projectName: "", technologies: "", description: "", link: "" },
    ],
    languages: [{ language: "", stars: 1 }], // Adăugăm secțiunea de limbi
  });

  const navigate = useNavigate();

  const handleChange = (e, section, index, field) => {
    if (typeof index === "number") {
      const updatedSection = [...formData[section]];
      updatedSection[index][field] = e.target.value;
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: e.target.value },
      });
    }
  };

  const handleAddField = (section) => {
    const newField = Object.keys(formData[section][0]).reduce(
      (acc, key) => ({ ...acc, [key]: "" }),
      {}
    );
    setFormData({ ...formData, [section]: [...formData[section], newField] });
  };

  const handleRemoveField = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Navigating with data:", formData); // Verifică datele trimise
    navigate("/preview", { state: { formData } });
  };

  const handlePresentToggle = (section, index) => {
    const updatedSection = [...formData[section]];
    updatedSection[index].isPresent = !updatedSection[index].isPresent;
    if (updatedSection[index].isPresent) {
      updatedSection[index].yearTo = "Present";
    } else {
      updatedSection[index].yearTo = "";
    }
    setFormData({ ...formData, [section]: updatedSection });
  };

  

  return (
    <div className="input-main">
      <h1 className="input-header">Create Your Resume</h1>
      <form className="input-form" onSubmit={handleSubmit}>
        {/* Personal Details */}
        <div className="input-head">Personal Details</div>
        {Object.keys(formData.personalDetails).map((field) => (
          <input
            key={field}
            type="text"
            value={formData.personalDetails[field]}
            onChange={(e) => handleChange(e, "personalDetails", null, field)}
            placeholder={`Enter your ${field}`}
          />
        ))}

        {/* Education */}
        <div className="input-head">Education</div>
        {formData.education.map((edu, index) => (
          <div key={index}>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => handleChange(e, "education", index, "degree")}
              placeholder="Degree"
            />
            <input
              type="text"
              value={edu.university}
              onChange={(e) => handleChange(e, "education", index, "university")}
              placeholder="University"
            />
            <input
              type="text"
              value={edu.yearFrom}
              onChange={(e) => handleChange(e, "education", index, "yearFrom")}
              placeholder="From (Year)"
            />
            {!edu.isPresent && (
              <input
                type="text"
                value={edu.yearTo}
                onChange={(e) => handleChange(e, "education", index, "yearTo")}
                placeholder="To (Year)"
              />
            )}
            <label>
              <input
                type="checkbox"
                checked={edu.isPresent}
                onChange={() => handlePresentToggle("education", index)}
              />
              Present
            </label>
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveField("education", index)}
                className="input-btn"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="add-input-block">
          <div className="add-input-icon" onClick={() => handleAddField("education")}>
            +
          </div>
          <div>Add Education</div>
        </div>

        {/* Work Experience */}
        <div className="input-head">Work Experience</div>
        {formData.workExperience.map((exp, index) => (
          <div key={index}>
            <input
              type="text"
              value={exp.jobTitle}
              onChange={(e) => handleChange(e, "workExperience", index, "jobTitle")}
              placeholder="Job Title"
            />
            <input
              type="text"
              value={exp.company}
              onChange={(e) => handleChange(e, "workExperience", index, "company")}
              placeholder="Company"
            />
            <input
              type="text"
              value={exp.yearFrom}
              onChange={(e) => handleChange(e, "workExperience", index, "yearFrom")}
              placeholder="From (Year)"
            />
            {!exp.isPresent && (
              <input
                type="text"
                value={exp.yearTo}
                onChange={(e) => handleChange(e, "workExperience", index, "yearTo")}
                placeholder="To (Year)"
              />
            )}
            <label>
              <input
                type="checkbox"
                checked={exp.isPresent}
                onChange={() => handlePresentToggle("workExperience", index)}
              />
              Present
            </label>
            <textarea
              className="custom-textarea"
              value={exp.description}
              onChange={(e) =>
                handleChange(e, "workExperience", index, "description")
              }
              placeholder="Description"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveField("workExperience", index)}
                className="input-btn"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="add-input-block">
          <div className="add-input-icon" onClick={() => handleAddField("workExperience")}>
            +
          </div>
          <div>Add Work Experience</div>
        </div>

        {/* Skills */}
        <div className="input-head">Skills</div>
        {formData.skills.map((skill, index) => (
          <div key={index}>
            <input
              type="text"
              value={skill.skillName}
              onChange={(e) => handleChange(e, "skills", index, "skillName")}
              placeholder="Skill Name"
            />
            <label>Proficiency (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={skill.stars}
              onChange={(e) => handleChange(e, "skills", index, "stars")}
              placeholder="Stars (1-5)"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveField("skills", index)}
                className="input-btn"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="add-input-block">
          <div
            className="add-input-icon"
            onClick={() => handleAddField("skills")}
          >
            +
          </div>
          <div>Add Skill</div>
        </div>

        {/* Projects */}
        <div className="input-head">Projects</div>
        {formData.projects.map((project, index) => (
          <div key={index}>
            <input
              type="text"
              value={project.projectName}
              onChange={(e) => handleChange(e, "projects", index, "projectName")}
              placeholder="Project Name"
            />
            <input
              type="text"
              value={project.technologies}
              onChange={(e) => handleChange(e, "projects", index, "technologies")}
              placeholder="Technologies"
            />
            <textarea
              className="custom-textarea"
              value={project.description}
              onChange={(e) =>
                handleChange(e, "projects", index, "description")
              }
              placeholder="Description"
            />
            <input
              type="url"
              value={project.link}
              onChange={(e) => handleChange(e, "projects", index, "link")}
              placeholder="Link"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveField("projects", index)}
                className="input-btn"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="add-input-block">
          <div
            className="add-input-icon"
            onClick={() => handleAddField("projects")}
          >
            +
          </div>
          <div>Add Project</div>
        </div>

        {/* Languages */}
        <div className="input-head">Languages</div>
        {formData.languages.map((lang, index) => (
          <div key={index}>
            <input
              type="text"
              value={lang.language}
              onChange={(e) => handleChange(e, "languages", index, "language")}
              placeholder="Language"
            />
            <label>Proficiency (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={lang.stars}
              onChange={(e) => handleChange(e, "languages", index, "stars")}
              placeholder="Stars (1-5)"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveField("languages", index)}
                className="input-btn"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="add-input-block">
          <div
            className="add-input-icon"
            onClick={() => handleAddField("languages")}
          >
            +
          </div>
          <div>Add Language</div>
        </div>

        {/* Submit */}
        <button type="submit" className="input-btn">
          Preview Resume
        </button>
      </form>
    </div>
  );
};

export default ResumeBuild;