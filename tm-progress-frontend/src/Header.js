import React, {useState} from "react";
import styled, {css} from "styled-components";

import useWindowSize from './utils/useWindowSize'
// Routing
import { Link, NavLink } from "react-router-dom";
import media from "./utils/media-queries";
import { FiMenu } from 'react-icons/fi';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

const filterComponentProps = (Comp, filterProps = []) => {
  const isValidProp = p => !filterProps.includes(p);
  return React.forwardRef((rawProps, ref) => {
    const props = Object.keys(rawProps).reduce((acc, p) => (
      isValidProp(p) ? { ...acc, [p]: rawProps[p] } : acc
    ), {});
    return <Comp ref={ref} {...props} />;
  });
}

const transitions = {
  left: {
    start: () => css`
      transform: translate(100vw, 0);
    `,
    end: () => css`
      transform: translate(0, 0);
    `
  }
};


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

const MobileMenu = styled.ul`
  position: absolute;
  right: 0;
  top: 4em;
  background: white;
  padding: 2.25rem;
  z-index: 30;
  height: 90vh;
  width: 75vw;
  box-shadow: -16px 0 48px -16px rgba(20, 43, 88,0.12);
  transition: all 0.24s ease;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  li {
    display: flex;
    width: 100%;
    align-items: stretch;
    > * {
      flex: 1;
    }
  }
  a {
    text-align: right;
    &.active {
      color: #0686E5};
    }
  }
  h5 {
    text-align: right;
    text-transform: uppercase;
    font-weight: 300;
    color: rgba(20,43,88,0.64);
    font-size: 0.875rem;
    line-height: 1rem;
    margin: 1rem;
  }
  &::before {
    content: '';
    position: fixed;
    top: 4rem;
    bottom: 0;
    left: 0;
    right: 75vw;
    background: rgba(20, 43, 88,0.16);
    opacity: 1;
    z-index: -1;
    transition: all 0.24s ease 0s;
  }
  & > li:nth-of-type(2) {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(20, 43, 88,0.16);
  }
  &.mobile-menu-enter {
    ${transitions.left.start}
  }
  &.mobile-menu-enter-active {
    ${transitions.left.end}
  }
  &.mobile-menu-exit {
    ${transitions.left.end}
  }
  &.mobile-menu-exit-active {
    ${transitions.left.start}
  }
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
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false)

  const mobileMenu = () => {
    return (<MobileMenu>
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
        </MobileMenu>
        )
  }

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
                // console.log('Menu opened')
                setIsMobileMenuOpened(currentIsMobileMenuOpened => !currentIsMobileMenuOpened)  

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
      <TransitionGroup component={null}>
          {isMobileMenuOpened && (
            <CSSTransition
              in={isMobileMenuOpened}
              unmountOnExit={true}
              classNames='mobile-menu'
              timeout={300}
            >
              {mobileMenu()}
            </CSSTransition>
          )}
        </TransitionGroup>
    </PageHead>
  );
};
