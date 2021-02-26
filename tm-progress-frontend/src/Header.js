import React from "react";
import styled from "styled-components";

import useWindowSize from './utils/useWindowSize'
// Routing
import { Link, NavLink } from "react-router-dom";
import media from "./utils/media-queries";
import { FiMenu } from 'react-icons/fi';

const filterComponentProps = (Comp, filterProps = []) => {
  const isValidProp = p => !filterProps.includes(p);
  return React.forwardRef((rawProps, ref) => {
    const props = Object.keys(rawProps).reduce((acc, p) => (
      isValidProp(p) ? { ...acc, [p]: rawProps[p] } : acc
    ), {});
    return <Comp ref={ref} {...props} />;
  });
}

const PageHead = styled.header`
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 1004;
  display: flex;
  box-shadow: 0 4px 16px 2px rgb(20 43 88 / 12%);
  a {
    text-decoration: none;
  }
`;

const PageHeadInner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  min-width: 100%;
`;

const PageTitle = styled.h1`
  font-size: 1.25rem;
  font-family: ;
  line-height: 2rem;
  text-transform: uppercase;
  color: black;
  padding: 0 1rem;
  margin: -1rem 0;
  font-weight: bold;
  img {
    max-width: 3.5rem;
  }
  a {
    color: inherit;
    display: flex;
    padding: 0 0 0.5rem;
    &:active {
      transform: none;
    }
  }
  span {
    font-size: 0.575rem;
    font-weight: 200;
    position: absolute;
    letter-spacing: 0.1rem;
    bottom: 0.125rem;
  }
  ${media.mediumUp`
    padding: 1rem 2rem 1rem 0rem;
    min-height: 4rem;
    min-width: 12rem;
    a {
      padding: 0 2rem 1.5rem;
    }
  `}
`;

const PageNav = styled.nav`
  display: flex;
  ${media.mediumUp`
    margin: 0 2rem 0 auto;
  `}
`;

const GlobalMenu = styled.ul`
  display: flex;
  list-style: none;
  ${media.mediumUp`
    flex-flow: row nowrap;
    justify-content: center;
    margin: 0;
    list-style: none;
    > * {
      margin: 0 0 0 2rem;
    }
  `}

  /* Make hamburger menu white*/
  ${media.smallDown`
    a:first-of-type {
      &::before {
        color: white;
        font-size: 1.5rem;
      }
    }
  `}
`;

const GlobalMenuLink = styled.button`
  position: relative;
  display: flex;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  text-align: center;
  transition: all 0.24s ease 0s;
  font-weight: bold;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  justify-content: flex-end;
  &,
  &:visited {
    color: inherit;
  }
  &.active,
  &:hover {
    color: #0686E5;
    background: rgba(6,134,229,0.08);
    opacity: 1;
    &::after {
      opacity: 1;
    }
  }
`;

const propsToFilter = ['variation', 'size', 'hideText', 'useIcon', 'active'];
const NavLinkFilter = filterComponentProps(NavLink, propsToFilter);

export const Header = () => {
  const { width, isMobile } = useWindowSize();

  return (
    <PageHead>
      <PageHeadInner>
        <PageTitle>
          <Link to="/" title="Go to homepage">
            <img src="./osm_ie_small.png" alt="osm ireland logo" />
            <span>
              OSM IRL<strong>Tracker</strong>
            </span>
          </Link>
        </PageTitle>
        <PageNav>
        <GlobalMenu>
        {isMobile ? (
          <li>
            <GlobalMenuLink
              as='a'
              
              title='View menu'
              onClick={() =>
                console.log('Menu opened')  
              }
            ><FiMenu /></GlobalMenuLink>
          </li>
        ) : (
          <>
          
            <li>
              <GlobalMenuLink as={NavLinkFilter} to="/trends" title="Go to longterm trends" >
                <span>Trends</span>
              </GlobalMenuLink>
          
            </li>
            <li>
          
              <GlobalMenuLink as={`a`} href="https://www.openstreetmap.ie/" title="OSM Ireland Website">
                <span>OSM Ireland</span>
              </GlobalMenuLink>
          
            </li>
            <li>
          
              <GlobalMenuLink as={`a`} href="https://tasks.openstreetmap.ie/" title="OSM Ireland Tasking Manager">
                <span>Tasking Manager</span>
              </GlobalMenuLink>
            </li>
            </>
        )}
        </GlobalMenu>
        </PageNav>
      </PageHeadInner>
    </PageHead>
  );
};
