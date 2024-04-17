import { useEffect } from 'react';
import './Footer.scss';

const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='footer'>
      <div className="container">
        <div className="top">
          <div className="item">
            <h1>Academic Services</h1>
            <span>Course Materials</span>
            <span>Study Groups</span>
            <span>Research Projects</span>
            <span>Lectures & Webinars</span>
            <span>Library Access</span>
            <span>Lab Equipment</span>
            <span>Data Analysis</span>
            <span>Academic Advising</span>
          </div>
          <div className="item">
            <h1>University Life</h1>
            <span>Campus Housing</span>
            <span>Student Organizations</span>
            <span>Health Services</span>
            <span>Sports & Recreation</span>
            <span>Counseling Services</span>
            <span>Study Abroad Programs</span>
          </div>
          <div className="item">
            <h1>Support</h1>
            <span>Help Desk</span>
            <span>Safety & Security</span>
            <span>IT Services</span>
            <span>Financial Aid</span>
          </div>
          <div className="item">
            <h1>Community</h1>
            <span>Events</span>
            <span>Alumni Network</span>
            <span>Volunteer Opportunities</span>
            <span>Community Engagement</span>
          </div>
          <div className="item">
            <h1>Professional Development</h1>
            <span>Career Services</span>
            <span>Internships</span>
            <span>Job Placement</span>
            <span>Professional Courses</span>
            <span>Networking Events</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>OLumsX</h2>
            <span>© {new Date().getFullYear()} OLumsX University</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="./media/twitter.png" alt="Twitter" />
              <img src="./media/facebook.png" alt="Facebook" />
              <img src="./media/linkedin.png" alt="LinkedIn" />
              <img src="./media/pinterest.png" alt="Pinterest" />
              <img src="./media/instagram.png" alt="Instagram" />
            </div>
            <div className="link">
              <img src="./media/language.png" alt="Language" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="./media/coin.png" alt="Currency" />
              <span>USD</span>
            </div>
            <div className="link">
              <img src="./media/accessibility.png" alt="Accessibility" />
              <span>Accessibility</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
