'use client';

import { useEffect } from 'react';

interface Props {
  location: {
    latitude: number;
    longitude: number;
  };
}

const NaverMap = ({ location }: Props) => {
  const initMap = (latitude: number, longitude: number) => {
    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(latitude, longitude),
      zoom: 15,
    });

    new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      map: map,
    });
  };

  useEffect(() => {
    initMap(location.latitude, location.longitude);
  }, [location]);

  return (
    <div className="relative w-full h-40 rounded-lg border border-neutral-300 bg-neutral-50 overflow-hidden">
      <div
        id="map"
        style={{
          maxWidth: '100%',
          width: '100%',
          height: '100%',
          zIndex: 0,
          position: 'relative',
          overflow: 'hidden',
          background: 'rgb(248, 249, 250)',
        }}
      />
    </div>
  );
};

export default NaverMap;
