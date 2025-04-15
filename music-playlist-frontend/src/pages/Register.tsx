import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';



const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, loading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    if (!name) {
      setFormError('Name is required');
      return false;
    }
    if (!email) {
      setFormError('Email is required');
      return false;
    }
    if (!password) {
      setFormError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await register(name, email, password);
    }
  };

  return (
    <PageContainer>
      <Logo>Music App</Logo>
      <FormContainer>
        <FormTitle>Create an account</FormTitle>

        <SocialButton type="button">Sign up with Google</SocialButton>
        <SocialButton type="button">Sign up with Facebook</SocialButton>

        <OrDivider>
          <span>OR</span>
        </OrDivider>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </FormGroup>

          {(formError || error) && (
            <ErrorMessage>{formError || error}</ErrorMessage>
          )}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </SubmitButton>
        </form>

        <LinkText>
          Already have an account? <Link to="/login">Log in</Link>
        </LinkText>
      </FormContainer>
    </PageContainer>
  );
};

export default Register;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #121212;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 2rem;
`;

const FormContainer = styled.div`
  background-color: #282828;
  border-radius: 8px;
  padding: 2rem;
  width: 450px;
  max-width: 100%;
`;

const FormTitle = styled.h2`
  color: white;
  font-size: 1.75rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: white;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #333;
  color: white;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #1db954;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border-radius: 30px;
  background-color: #1db954;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background-color: #1ed760;
  }
  &:disabled {
    background-color: #535353;
    cursor: not-allowed;
  }
`;

const LinkText = styled.div`
  color: #b3b3b3;
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: #b3b3b3;
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #535353;
  }
  span {
    padding: 0 1rem;
    font-size: 0.9rem;
  }
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border-radius: 30px;
  background-color: #fff;
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #eee;
  }
`;