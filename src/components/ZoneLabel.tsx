import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ZoneInfo } from '../hooks/useZoneLogic';

interface ZoneLabelProps {
  zoneInfo: ZoneInfo;
  exposureAdjustment: string;
}

const ZoneLabel: React.FC<ZoneLabelProps> = ({ zoneInfo, exposureAdjustment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.zoneName}>Zone {zoneInfo.name}</Text>
        <View style={[styles.colorSwatch, { backgroundColor: zoneInfo.tone }]} />
      </View>
      
      <Text style={styles.description}>{zoneInfo.description}</Text>
      
      <View style={styles.exposureContainer}>
        <Text style={styles.exposureLabel}>Exposure Adjustment:</Text>
        <Text style={styles.exposureValue}>{exposureAdjustment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  zoneName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  exposureContainer: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 4,
  },
  exposureLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  exposureValue: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ZoneLabel; 