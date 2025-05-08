import { useState, useCallback } from 'react';

// Define the range of zones in the Zone System (0-X, where X is 10)
export const TOTAL_ZONES = 11;
export const ZONE_NAMES = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export interface ZoneInfo {
  number: number;
  name: string;
  description: string;
  tone: string;
}

// Zone descriptions based on Ansel Adams' Zone System
const ZONE_DESCRIPTIONS: string[] = [
  'Pure black, no detail',
  'Near black, slight tonality but no texture',
  'Textured black, deep shadows',
  'Average dark materials, low textured shadows',
  'Average dark foliage, dark stone, landscape shadow',
  'Middle gray, 18% reflectance, clear north sky',
  'Average Caucasian skin, light stone, shadows in snow',
  'Very light skin, light gray objects',
  'Textured whites, snow with acute side lighting',
  'White with textureless delicate values',
  'Pure white, no detail, light sources',
];

const ZONE_TONES: string[] = [
  '#000000', // Zone 0: Pure black
  '#1a1a1a', // Zone I
  '#333333', // Zone II
  '#4d4d4d', // Zone III
  '#666666', // Zone IV
  '#808080', // Zone V: Middle gray
  '#999999', // Zone VI
  '#b3b3b3', // Zone VII
  '#cccccc', // Zone VIII
  '#e6e6e6', // Zone IX
  '#ffffff', // Zone X: Pure white
];

export default function useZoneLogic() {
  const [selectedZone, setSelectedZone] = useState<number>(5); // Default to Zone V (middle gray)
  const [meteredZone, setMeteredZone] = useState<number>(5);
  
  // Calculate the shift in stops between the metered zone and the selected zone
  const stopsDifference = selectedZone - meteredZone;
  
  // Get all zone information
  const getZoneInfo = useCallback((zoneNumber: number): ZoneInfo => {
    return {
      number: zoneNumber,
      name: ZONE_NAMES[zoneNumber],
      description: ZONE_DESCRIPTIONS[zoneNumber],
      tone: ZONE_TONES[zoneNumber],
    };
  }, []);
  
  // Get all zones with their current relative positions
  const getAllZones = useCallback((): ZoneInfo[] => {
    return Array.from({ length: TOTAL_ZONES }, (_, i) => getZoneInfo(i));
  }, [getZoneInfo]);
  
  // Get a specific zone with its information
  const getSelectedZoneInfo = useCallback((): ZoneInfo => {
    return getZoneInfo(selectedZone);
  }, [selectedZone, getZoneInfo]);
  
  // Get exposure adjustment needed based on the difference between metered and selected zones
  const getExposureAdjustment = useCallback((): string => {
    if (stopsDifference === 0) return 'No adjustment needed';
    const direction = stopsDifference > 0 ? 'Increase' : 'Decrease';
    const stops = Math.abs(stopsDifference);
    const stopsText = stops === 1 ? 'stop' : 'stops';
    return `${direction} exposure by ${stops} ${stopsText}`;
  }, [stopsDifference]);
  
  return {
    selectedZone,
    setSelectedZone,
    meteredZone,
    setMeteredZone,
    stopsDifference,
    getZoneInfo,
    getAllZones,
    getSelectedZoneInfo,
    getExposureAdjustment,
    ZONE_NAMES,
    TOTAL_ZONES,
  };
} 