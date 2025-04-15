import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SearchOutlined, PersonOutline } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <NavContainer>
      <form onSubmit={handleSearch}>
        <SearchContainer>
          <SearchOutlined />
          <SearchInput
            placeholder="Search for songs, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
      </form>

      <UserSection>
        {user ? (
          <>
            <UserAvatar onClick={() => setMenuOpen(!menuOpen)}>
              {user.name.charAt(0).toUpperCase()}
            </UserAvatar>
            <UserMenu isOpen={menuOpen}>
              <MenuItem>
                <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </UserMenu>
          </>
        ) : (
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
            Login
          </Link>
        )}
      </UserSection>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #121212;
  color: white;
  position: fixed;
  top: 0;
  right: 0;
  left: 240px; // Adjust for sidebar width
  z-index: 100;
  height: 64px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #282828;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  width: 300px;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  width: 100%;
  margin-left: 0.5rem;
  &:focus {
    outline: none;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #535353;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const UserMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #282828;
  border-radius: 4px;
  padding: 0.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  min-width: 150px;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;

const MenuItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;