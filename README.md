# ByteResume
Web Technologies project

This repository is representing our Web Technologies project.
We want to create a tool that would generate a cool CV for a Software Developer.

Q: "Cine v-a lucrat aici??" (Who worked here?)  
A: Razvan Radoi, Paul Roman, Paul Sburlea

Ensure the following tools are installed on your system ;) :
  Node.js : https://nodejs.org/en
  Git : https://git-scm.com
  A package manager : npm -> see below the steps


Steps to run the project:
  1) Clone the repo:
     - git clone https://github.com/romanpaaul/ByteResume.git
     - cd ByteResume
  2) Install dependencies:
     ~ Backend:
       - cd backend
       - npm install
     ~ Frontend:
       - cd ../frontend
       - npm install
  3) Run the Backend:
     - cd backend
     - node ./index.js
  4) Run the Frontend:
     - cd frontend
     - npm start
    
// For DB:
  Users are added in mongodb database after register
  run in backend director:
  - npm install mongodb
  - npm install mongoose
  install MongoDB Community Server:
  https://www.mongodb.com/try/download/community
    

// Additional notes:
  - If you see warnings when using git add . -> like LF will be replaced by CRLF, run the following command: -> git config --global core.autocrlf true
  - Then re-add the files: -> git add --renormalize .


      
