import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import './Header.css';

function Header() {
  const { isLoggedIn } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className="header">
      <div className="header-section">
        <div className="logo">Paying Guest</div>

        <div className="toggle-icon" onClick={toggleMenu}>
          <span className={menuOpen ? 'top active' : 'top'}></span>
          <span className={menuOpen ? 'middle hidden' : 'middle'}></span>
          <span className={menuOpen ? 'bottom active' : 'bottom'}></span>
        </div>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
            </>
          ) : (
            <>
              <Link to="addtenant" onClick={() => setMenuOpen(false)}>AddTenant</Link>
              <Link to="alltenants" onClick={() => setMenuOpen(false)}>AllTenants</Link>
              <Link to="profile" onClick={() => setMenuOpen(false)}>Profile</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
