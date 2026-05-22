"use client";

import { useEffect, useRef, useState } from "react";

type NaverLatLng = {
  new (lat: number, lng: number): unknown;
};

type NaverMapConstructor = {
  new (
    element: HTMLElement,
    options: {
      center: unknown;
      zoom: number;
    },
  ): unknown;
};

type NaverMarkerConstructor = {
  new (options: {
    position: unknown;
    map: unknown;
  }): unknown;
};

declare global {
  interface Window {
    naver?: {
      maps: {
        LatLng: NaverLatLng;
        Map: NaverMapConstructor;
        Marker: NaverMarkerConstructor;
      };
    };
  }
}

const NAVER_MAP_SCRIPT_ID = "naver-map-script";
const CENTER = {
  lat: 37.5036,
  lng: 127.0244,
};

export default function NaverMap() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

    if (!clientId) {
      console.error("NEXT_PUBLIC_NAVER_MAP_CLIENT_ID is not configured.");
      setHasError(true);
      return;
    }

    const initializeMap = () => {
      if (!mapRef.current || !window.naver?.maps) {
        console.error("Naver Maps SDK is not available.");
        setHasError(true);
        return;
      }

      const center = new window.naver.maps.LatLng(CENTER.lat, CENTER.lng);
      const map = new window.naver.maps.Map(mapRef.current, {
        center,
        zoom: 16,
      });

      new window.naver.maps.Marker({
        position: center,
        map,
      });
    };

    if (window.naver?.maps) {
      initializeMap();
      return;
    }

    const existingScript = document.getElementById(NAVER_MAP_SCRIPT_ID);

    if (existingScript) {
      existingScript.addEventListener("load", initializeMap, { once: true });
      existingScript.addEventListener(
        "error",
        () => {
          console.error("Failed to load Naver Maps SDK.");
          setHasError(true);
        },
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = NAVER_MAP_SCRIPT_ID;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = initializeMap;
    script.onerror = () => {
      console.error("Failed to load Naver Maps SDK.");
      setHasError(true);
    };

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === wrapperRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleFullscreenToggle = async () => {
    if (!wrapperRef.current) {
      return;
    }

    try {
      if (document.fullscreenElement === wrapperRef.current) {
        await document.exitFullscreen();
        return;
      }

      await wrapperRef.current.requestFullscreen();
    } catch (error) {
      console.error("Failed to toggle fullscreen mode.", error);
    }
  };

  if (hasError) {
    return (
      <div
        className="flex w-full items-center justify-center bg-surface text-sm font-semibold text-textSub"
        style={{ height: "450px" }}
      >
        지도를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="relative w-full bg-surface" style={{ height: "450px" }}>
      <div ref={mapRef} className="h-full w-full" />
      <button
        type="button"
        aria-label={isFullscreen ? "전체화면 종료" : "전체화면 보기"}
        onClick={handleFullscreenToggle}
        className="absolute right-3 top-3 z-[1000] flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold leading-none text-textMain shadow-lg transition hover:bg-slate-50"
      >
        {isFullscreen ? "×" : "⤢"}
      </button>
    </div>
  );
}
