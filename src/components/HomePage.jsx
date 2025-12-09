import { IconBarbell } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

import ReadPosts from './ReadPosts'

function HomePage() {

    return (
        <div>
            <IconBarbell size={60} />
            <h1> Show Your Best!</h1>
            <p> This is a website to connect with fellow powerlifters and show off your most favorite lifts to date of your lifting career!</p>
            <Link to='/UploadPage'>
                <button>Upload your favorite lift!</button>
            </Link>
            <ReadPosts />
        </div>
    );
}

export default HomePage;