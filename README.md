# Smart Recipe Generator


## Overview
Smart Recipe Generator is a simple web application that suggests recipes based on user input. Users can type in what they want to cook, and the system retrieves recipes from a MySQL database along with their ingredients and cooking steps.


### Tech Stack
- **Frontend:** React (TypeScript), Bootstrap
- **Backend:** Node.js, Express
- **Database:** MySQL


### Setup Instructions
```bash
# Backend
cd smart-recipe-backend
node server.js


# Frontend
cd smart-recipe-frontend
npm start
```


### UML Diagram
```
+---------------------+
| User |
+---------------------+
|
v
+---------------------+
| React Frontend |
| (Input Query Box) |
+---------------------+
|
v
+---------------------+
| Express API Server |
| /recipes endpoint |
+---------------------+
|
v
+---------------------+
| MySQL Database |
| (recipes + ingredients) |
+---------------------+

