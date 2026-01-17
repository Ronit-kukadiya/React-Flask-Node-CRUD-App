## React-Flask-Node-CRUD-App
a crud application with react-vite based frontend and backend made with node and flask


# for flask backend:
 1. Create a virtual environment
    ```bash python -m venv venv bash```

 3. Activate the virtual environment
  Windows (PowerShell):
    venv\Scripts\Activate.ps1
  Windows (CMD):
    venv\Scripts\activate
  macOS / Linux:
    source venv/bin/activate
    
 4. Install dependencies
  pip install -r requirements.txt

 5. Run the Flask server
  python main.py
  The backend will start at:
    http://localhost:5000


# for node backend:
 1. Install dependencies
  npm install

 2. Install nodemon
  npm i -g nodemon

 3. Run the server
  nodemon index.js
  The backend will start at:
    http://localhost:3000


# for frontend
 1. Install dependencies
  npm install

 2. Run the development server
  npm run dev
  The frontend will start at:
    http://localhost:5173


The frontend communicates with the backend using REST APIs.
I have implemented the backend in both Flask and Node to explore how each works.

# *Important*: 
At any given time, the frontend should connect to only one backend. Make sure only one backend server is running before starting the frontend.

Backend URLs

 1. Flask backend: http://localhost:5000

 2. Node backend: http://localhost:3000
