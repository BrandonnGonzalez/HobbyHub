import { IconBarbell } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

import ReadPosts from './ReadPosts'
import './HomePage.css'

function HomePage() {

    return (
        <div className="home-page">
            <div className="home-container">
                <div className="home-header">
                    <IconBarbell size={80} color="#667eea" className="home-icon" />
                    <h1 className="home-title">Show Your Best!</h1>
                    <p className="home-description">
                        Connect with fellow powerlifters and showcase your most impressive lifts.
                        Share your journey, inspire others, and celebrate your progress!
                    </p>
                    <Link to='/UploadPage' className="home-link">
                        <button className="home-cta-button">
                            🏋️ Upload Your Favorite Lift!
                        </button>
                    </Link>
                </div>
                <ReadPosts />
            </div>
        </div>
    );
}

export default HomePage;