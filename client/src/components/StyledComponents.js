import styled from 'styled-components';

export const StyledTitle = styled.div`
  font-size: 1.2rem;
  text-decoration: none;
  /* opacity: 0; */
  /* background: rgba(0, 0, 0, 0.7);
  height: 20rem;
  transform: translateY(0%); */
`;

export const StyledImage = styled.img`
  transform: translateY(0%);
`;

export const StyledContainer = styled.ul`
  margin-top: 5rem;
  display: flex;
  justify-content: space-evenly;
  height: 40vh;

  > img:hover {
    cursor: pointer;
  }

  > :nth-child(1) > img {
    height: 100%;
  }

  > :nth-child(2) > img {
    height: 100%;
  }

  > :nth-child(3) > img {
    height: 100%;
  }

  > :nth-child(4) > img {
    height: 100%;
  }

  > :nth-child(5) > img {
    height: 100%;
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
  height: 2rem;
  display: flex;
`;

export const InfoContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 0;
  margin: 0 0 0 1.7rem;
  flex-direction: column;
`;

export const InfoTitle = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  color: #fff;
`;
