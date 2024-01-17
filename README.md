# Socio-Sonnet: A Next.js Twitter Clone
## Overview
Socio-Sonnet is a Twitter clone project built with Next.js 14, Tailwind CSS, and MongoDB. The project aims to replicate the core features of Twitter, allowing users to post tweets, follow other users, and engage in a social network. Google OAuth is implemented for seamless authentication.

## Features
* User Authentication: Utilizes Google OAuth for secure and convenient user authentication.
* Tweeting: Users can compose and post tweets, sharing their thoughts and updates with the Socio-Sonnet community.
* Following: Follow and be followed by other users to stay updated with their tweets.
* Timeline: Personalized timelines display tweets from followed users, providing a dynamic and engaging user experience.
* Likes and Retweets: Users can express their appreciation for tweets by liking and retweeting them.
## Tech Stack
* Next.js 14: A React framework for building server-rendered React applications.
* Tailwind CSS: A utility-first CSS framework for building modern web applications.
* MongoDB: A NoSQL database for storing user data and tweets.
* Google OAuth: Secure and efficient user authentication.
## Getting Started
* Prerequisites
1. Node.js installed on your machine.
2. MongoDB instance set up for data storage.
   Google Developer Console project for OAuth configuration.
# Installation
* Clone the repository:

```
git clone https://github.com/shreyanshTechz/SocioSonnet.git
```

* Navigate to the project directory:
```
cd SocioSonnet
```
* Install dependencies:
```
npm install
```
* Set up environment variables:

Create a .env.local file in the root directory and add the following:
```
GOOGLE_CLIENT_ID = 
GOOGLE_CLIENT_SECRET =
MONGODB_URI = 
NODE_ENV = development
SECRET = 
```
Replace your-google-client-id and your-mongodb-uri with your Google OAuth client ID and MongoDB connection URI.

Start the development server:
```
npm run dev
```
Open your browser and visit http://localhost:3000 to see Socio-Sonnet in action.

# Contributing
* Contributions are welcome! Please follow our contribution guidelines.

# License
This project is licensed under the MIT License - see this LICENSE for details.

# Acknowledgements
Special thanks to the developers of Next.js, Tailwind CSS, and MongoDB for creating powerful tools that made this project possible.
