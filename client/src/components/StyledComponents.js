import styled from 'styled-components';

export const StyledTitle = styled.div`
  font-size: 1.2rem;
  text-decoration: none;
`;

export const StyledImage = styled.img`
  transform: translateY(0%);
`;

export const StyledContainer = styled.div`
  display: grid;
  grid-template: 1fr 1fr / repeat(5, 1fr);
  width: 100%;
  padding: 0rem 6rem;
  grid-gap: 2rem;

  > img:hover {
    cursor: pointer;
  }
`;

export const StyledAnchor = styled.a`
  height: 100%;

  :hover :nth-child(1) + div {
    opacity: 1;
  }
`;

export const H2Home = styled.h2`
  color: white;
  font-size: 1.4rem;
  transform: translateY(3.23rem);
  text-transform: uppercase;
  margin-left: 4.5rem;

  ::after {
    content: '';
    display: block;
    width: 18%;
    padding-top: 15px;
    border-bottom: 0.15rem solid #e10098;
  }
`;

export const NavBar = styled.nav`
  background-color: #303030;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  display: flex;
`;

export const InfoContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 0;
  margin: 0 0 0 2rem;
  flex-direction: column;

  figure {
    margin: 2rem 0;
  }
`;

export const InfoTitle = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  color: #fff;
`;
