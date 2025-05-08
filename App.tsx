import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, StatusBar, useColorScheme } from 'react-native';
import ZoneWheel from './src/components/ZoneWheel';
import ZoneLabel from './src/components/ZoneLabel';
import useZoneLogic from './src/hooks/useZoneLogic';

export default function App() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const {
    selectedZone,
    setSelectedZone,
    meteredZone,
    setMeteredZone,
    getAllZones,
    getSelectedZoneInfo,
    getExposureAdjustment,
  } = useZoneLogic();
  
  const zones = getAllZones();
  const selectedZoneInfo = getSelectedZoneInfo();
  const exposureAdjustment = getExposureAdjustment();
  
  const [mode, setMode] = useState<'selected' | 'metered'>('selected');
  
  const handleZoneSelected = (zoneIndex: number) => {
    if (mode === 'selected') {
      setSelectedZone(zoneIndex);
    } else {
      setMeteredZone(zoneIndex);
    }
  };
  
  const toggleMode = () => {
    setMode(mode === 'selected' ? 'metered' : 'selected');
  };
  
  return (
    <SafeAreaView style={[
      styles.container,
      isDarkMode ? styles.darkContainer : styles.lightContainer
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#121212' : '#ffffff'}
      />
      
      <View style={styles.header}>
        <Text style={[
          styles.title,
          isDarkMode ? styles.darkText : styles.lightText
        ]}>In the Zone</Text>
        <Text style={[
          styles.subtitle,
          isDarkMode ? styles.darkSubtitle : styles.lightSubtitle
        ]}>Zone System Companion</Text>
      </View>
      
      <ZoneWheel
        zones={zones}
        selectedZone={mode === 'selected' ? selectedZone : meteredZone}
        onZoneSelected={handleZoneSelected}
      />
      
      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.modeButton,
            mode === 'selected' ? styles.activeButton : styles.inactiveButton,
            isDarkMode ? styles.darkButton : styles.lightButton
          ]}
          onPress={() => setMode('selected')}
        >
          <Text style={[
            styles.buttonText,
            mode === 'selected' ? styles.activeButtonText : styles.inactiveButtonText,
            isDarkMode ? styles.darkButtonText : styles.lightButtonText
          ]}>
            Selected Zone ({selectedZone})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.modeButton,
            mode === 'metered' ? styles.activeButton : styles.inactiveButton,
            isDarkMode ? styles.darkButton : styles.lightButton
          ]}
          onPress={() => setMode('metered')}
        >
          <Text style={[
            styles.buttonText,
            mode === 'metered' ? styles.activeButtonText : styles.inactiveButtonText,
            isDarkMode ? styles.darkButtonText : styles.lightButtonText
          ]}>
            Metered Zone ({meteredZone})
          </Text>
        </TouchableOpacity>
      </View>
      
      <ZoneLabel
        zoneInfo={selectedZoneInfo}
        exposureAdjustment={exposureAdjustment}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  lightContainer: {
    backgroundColor: '#f8f8f8',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  lightSubtitle: {
    color: '#666',
  },
  darkSubtitle: {
    color: '#aaa',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeButton: {
    borderWidth: 2,
  },
  inactiveButton: {
    borderWidth: 1,
    opacity: 0.7,
  },
  lightButton: {
    borderColor: '#007AFF',
    backgroundColor: '#fff',
  },
  darkButton: {
    borderColor: '#4D90FE',
    backgroundColor: '#222',
  },
  buttonText: {
    fontWeight: '600',
  },
  activeButtonText: {
    fontWeight: 'bold',
  },
  inactiveButtonText: {
    fontWeight: 'normal',
  },
  lightButtonText: {
    color: '#007AFF',
  },
  darkButtonText: {
    color: '#4D90FE',
  },
});
