import React, { useState, useEffect } from "react";
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
      profileImage: "",
    },
    education: [{ degree: "", university: "", yearFrom: "", yearTo: "" }],
    experience: [
      { jobTitle: "", company: "", yearFrom: "", yearTo: "", description: "" },
    ],
    skills: [{ skillName: "", proficiency: "" }],
    projects: [
      { projectName: "", technologies: "", description: "", link: "" },
    ],
    languages: [{ language: "", stars: "" }],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Utilizează userId-ul salvat
    if (userId) {
      fetch(`http://localhost:5000/getProfile/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            personalDetails: {
              fullName: data.personalDetails?.fullName || "",
              email: data.personalDetails?.email || "",
              phone: data.personalDetails?.phone || "",
              city: data.personalDetails?.city || "",
              country: data.personalDetails?.country || "",
              professionalTitle: data.personalDetails?.professionalTitle || "",
              profileImage: data.personalDetails?.profileImage || "",
            },
            education: data.education?.map((edu) => ({
              degree: edu.degree || "",
              university: edu.institution || "",
              yearFrom: edu.startDate ? new Date(edu.startDate).getFullYear() : "",
              yearTo: edu.isPresent
                ? "Present"
                : edu.endDate
                ? new Date(edu.endDate).getFullYear()
                : "",
              isPresent: edu.isPresent || false,
            })) || [{ degree: "", university: "", yearFrom: "", yearTo: "", isPresent: false }],
            experience: data.experience?.map((exp) => ({
              jobTitle: exp.jobTitle || "",
              company: exp.company || "",
              yearFrom: exp.startDate ? new Date(exp.startDate).getFullYear() : "",
              yearTo: exp.isPresent
                ? "Present"
                : exp.endDate
                ? new Date(exp.endDate).getFullYear()
                : "",
              description: exp.description || "",
              isPresent: exp.isPresent || false,
            })) || [
              {
                jobTitle: "",
                company: "",
                yearFrom: "",
                yearTo: "",
                description: "",
                isPresent: false,
              },
            ],
            skills: data.skills || [{ skillName: "", stars: "" }],
            projects: data.projects?.map((proj) => ({
              projectName: proj.projectName || "",
              technologies: proj.technologies || "",
              description: proj.description || "",
              link: proj.link || "",
            })) || [{ projectName: "", technologies: "", description: "", link: "" }],
            languages: data.languages || [{ language: "", stars: "" }],
          });
        })
        .catch((error) => console.error("Error fetching profile data:", error));
    }
  }, []);
  
  
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

  const handlePresentToggle = (section, index) => {
    const updatedSection = [...formData[section]];
    updatedSection[index].isPresent = !updatedSection[index].isPresent;
    updatedSection[index].yearTo = updatedSection[index].isPresent
      ? "Present"
      : "";
    setFormData({ ...formData, [section]: updatedSection });
  };


  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in!");
      return;
    }
  
    console.log("Sending data:", { userId, ...formData }); // Log pentru verificare
    
    try {
      const response = await fetch("http://localhost:5000/saveResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...formData }),
      });
  
      const result = await response.json();
      console.log("Server response:", result); // Log pentru răspunsul serverului
  
      if (response.ok) {
        alert("Resume saved successfully!");
      } else {
        alert(`Error saving resume: ${result.message}`);
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("An unexpected error occurred!");
    }
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/preview", { state: { formData } });
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
        {formData.experience.map((exp, index) => (
          <div key={index}>
            <input
              type="text"
              value={exp.jobTitle}
              onChange={(e) => handleChange(e, "experience", index, "jobTitle")}
              placeholder="Job Title"
            />
            <input
              type="text"
              value={exp.company}
              onChange={(e) => handleChange(e, "experience", index, "company")}
              placeholder="Company"
            />
            <input
              type="text"
              value={exp.yearFrom}
              onChange={(e) => handleChange(e, "experience", index, "yearFrom")}
              placeholder="From (Year)"
            />
            {!exp.isPresent && (
              <input
                type="text"
                value={exp.yearTo}
                onChange={(e) => handleChange(e, "experience", index, "yearTo")}
                placeholder="To (Year)"
              />
            )}
            <label>
              <input
                type="checkbox"
                checked={exp.isPresent}
                onChange={() => handlePresentToggle("experience", index)}
              />
              Present
            </label>
            <textarea
              className="custom-textarea"
              value={exp.description}
              onChange={(e) =>
                handleChange(e, "experience", index, "description")
              }
              placeholder="Description"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveField("experience", index)}
                className="input-btn"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="add-input-block">
          <div className="add-input-icon" onClick={() => handleAddField("experience")}>
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
        <button type="button" onClick={handleSave} className="input-btn">
  Save
</button>
<button type="submit" className="input-btn">
  Preview Resume
</button>

      </form>
    </div>
  );
};

export default ResumeBuild;
