import React from "react";
import "../../styles/Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="video-container">
        <video autoPlay muted loop className="background-video desktop-video">
          <source src="/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Alternate video for mobile screens */}
        <video autoPlay muted loop className="background-video mobile-video">
          <source src="/mobile-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Alternate video for taablet screens */}
        <video autoPlay muted loop className="background-video tablet-video">
          <source src="/screen-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="content">
          <div className="content-btn">
            <Link to='/rakhis'>
              <button>Send Rakhis</button>
            </Link>
            <button>Send Rakhis with messages</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
