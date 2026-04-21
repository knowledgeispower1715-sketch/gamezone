"use client";

import { useState, useEffect } from "react";

export interface DeviceInfo {
  isMobile: boolean;
  isDesktop: boolean;
  /** true once client-side detection has run */
  ready: boolean;
}

const MOBILE_BREAKPOINT = 768;

/**
 * Detect mobile vs desktop using screen width + user-agent.
 * SSR-safe: returns `ready: false` until hydrated on client.
 */
export function useDevice(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>({
    isMobile: false,
    isDesktop: true,
    ready: false,
  });

  useEffect(() => {
    function detect(): DeviceInfo {
      const width = window.innerWidth;
      const ua = navigator.userAgent || "";

      // User-agent check for mobile devices
      const uaMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          ua
        );

      // Combine: prefer width but also trust UA for tablets in portrait
      const isMobile = width < MOBILE_BREAKPOINT || (uaMobile && width < 1024);

      return { isMobile, isDesktop: !isMobile, ready: true };
    }

    // Initial detect
    setInfo(detect());

    // Re-detect on resize (debounced)
    let timeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setInfo(detect()), 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return info;
}
