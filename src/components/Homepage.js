import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../CSSFolder/homepage.css';
import image from '../images/voteLogo.jpg'; // Import your logo image

function Homepage() {
  return (
    <div className="member-of-parliament-page">
      <Header />
      <div className="content">
        <div className="side-by-side">
          {/* <img
            src={image} // Use the imported logo image
            width="200"
            height="200"
            alt="Online Election System Logo"
          /> */}
          <div className="articles-container">
            <div className="article">
              <h2>Why Should I Vote?</h2>
              <p>Voting in the student union election is your opportunity to have a say in the direction of Mekelle University. Your vote matters and helps shape the future of our campus community.</p>
            </div>
            <div className="article">
              <h2>The Importance of Student Union</h2>
              <p>The student union represents the collective voice of Mekelle University students. It plays a vital role in advocating for student rights, organizing events, and fostering a sense of belonging on campus.</p>
            </div>
            <div className="article">
              <h2>How to Participate</h2>
              <p>To participate in the student union election, make sure you are registered as a student at Mekelle University. Stay tuned for announcements regarding candidate nominations, voting procedures, and election dates.</p>
            </div>
          </div>
        </div>
        <div className="body-content">
          <div className="candidate-profiles">
            <h2>Candidate Profiles</h2>
            <p>Get to know the candidates running for student union positions:</p>
            {/* Placeholder for candidate profiles */}
            <div className="candidate-profile">Candidate Profile 1</div>
            <div className="candidate-profile">Candidate Profile 2</div>
            {/* Add more candidate profiles as needed */}
          </div>
          <div className="election-guidelines">
            <h2>Election Guidelines</h2>
            <p>Review the election guidelines and rules to ensure a fair and transparent election process:</p>
            {/* Placeholder for election guidelines */}
            <div className="guideline">Election Guideline 1</div>
            <div className="guideline">Election Guideline 2</div>
            {/* Add more guidelines as needed */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Homepage;
