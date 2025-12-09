import { Link, useLocation } from 'react-router-dom';
import { IconBarbell } from '@tabler/icons-react';
import './Navbar.css';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <IconBarbell size={50} color="#667eea" className="navbar-icon" />
                <span className="navbar-title">HobbyHub</span>
            </Link>
        </nav>
    );
}

export default Navbar;
