import { useState, useEffect } from 'react';

export interface BreakpointState {
  isMobile: boolean;       // < 640px (Phones: 320px - 639px)
  isTablet: boolean;       // 640px - 1023px (iPads, tablets)
  isLaptop: boolean;       // 1024px - 1439px (Standard 13"/14" laptops, 1366x768)
  isDesktop: boolean;      // >= 1440px (FHD 1920x1080, 2K, 4K monitors)
  isTouch: boolean;        // Touch/Pointer coarse detection
  width: number;
  height: number;
}

export function useBreakpoint(): BreakpointState {
  const [state, setState] = useState<BreakpointState>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isLaptop: true,
        isDesktop: false,
        isTouch: false,
        width: 1280,
        height: 800,
      };
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    return {
      isMobile: width < 640,
      isTablet: width >= 640 && width < 1024,
      isLaptop: width >= 1024 && width < 1440,
      isDesktop: width >= 1440,
      isTouch,
      width,
      height,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isTouch = window.matchMedia('(pointer: coarse)').matches;

      setState({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isLaptop: width >= 1024 && width < 1440,
        isDesktop: width >= 1440,
        isTouch,
        width,
        height,
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return state;
}
