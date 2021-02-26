import React from "react";
import { mediaRanges } from './media-queries'

export default function useWindowSize() {
  const isSSR = typeof window !== "undefined";
  const [windowSize, setWindowSize] = React.useState({
    width: isSSR ? 1200 : window.innerWidth,
    height: isSSR ? 800 : window.innerHeight,
    isMobile: isSSR ? false : window.innerWidth < mediaRanges.medium[0]
  });

  function changeWindowSize() {
    
    setWindowSize({ width: window.innerWidth, height: window.innerHeight, isMobile: window.innerWidth < mediaRanges.medium[0] });
  }

  React.useEffect(() => {
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}