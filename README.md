# Big Play Picks

This is Big Play Picks! A simple fantasy football app built using a MERN stack. This app allows users to create an account, join a league or create their own, draft their team, and manage their fantasy football teams as they face other users head to head.

## Features included
  Account Management  
  League Management  
  Team Creation  
  Drafting  
  Performance Tracking  

## Tech Stack
  Frontend: React, React Router, CSS  
  Backend: Node.js, Express  
  Database: MongoDB  
  API: TheSportsDB  

## Known Issues  
  - There may be issues with the deployed app communicating between server and client. This requires further debugging.
  - On login, the dashboard doesn't load team info, but the team info displays after drafting a team. This will require further debugging.  
  - Error handling on draft page could use more clarity. This will be further worked on to make an easier experience for users.  
  - The draft feature is in a very beta state. This feature will be a focus to build, flesh out, and complete!  
  - User login and registration are functional but there may be issues with managing user sessions that will require further debugging  
  - Confirmation and error messages need to be implemented for better UX  

## **How to Locally Run the App**  
1. Clone the repo
2. Install dependencies  
```
cd client &&& npm install  
../  
cd server && npm install  
```
3. Replace API URLs in the frontend with http://localhost:5000/api for the backend and http://localhost:3000 for the frontend (there were issues trying to connect via env in the frontend, but the file is there for further debugging)  
4. Start the backend (```cd server && npm start```)  
5. Start the frontend (```cd client && npm start```)  
6. Open http://localhost:3000 in your browser

## Future Improvements  
  Enhanced User Management  
    - Profile customization  
    - Account recovery

  Trading and Transactions  
    - Setting up a waiver wire, and built-in waiver order  
    - Allow players to negotiate and commit trades during the season  
    - Implement a trade veto system  

  Improved API implementation  
    - Because of the limitations of the API, many features such as drafting and real-time performance tracking are not as fleshed out as I'd like. This could be fixed by working with a more advanced API.  

  CSS Styling  
    - As this is a MVP, the styling is focused on functionality at the moment. But further implementations to present a more fun and exciting look to the app will be coming!  

  Responsive Design  
    - Implement design responsiveness that would improve UX across devices (i.e. mobile responsiveness)  
