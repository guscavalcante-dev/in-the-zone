import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, G, Text as SvgText, Line } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { ZoneInfo, TOTAL_ZONES, ZONE_NAMES } from '../hooks/useZoneLogic';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.85;
const WHEEL_RADIUS = WHEEL_SIZE / 2;
const CENTER_X = WHEEL_SIZE / 2;
const CENTER_Y = WHEEL_SIZE / 2;
const ZONE_WIDTH = 30;

interface ZoneWheelProps {
  zones: ZoneInfo[];
  selectedZone: number;
  onZoneSelected: (zoneIndex: number) => void;
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const ZoneWheel: React.FC<ZoneWheelProps> = ({ zones, selectedZone, onZoneSelected }) => {
  const rotation = useSharedValue(0);
  const zoneAngle = 360 / TOTAL_ZONES;
  
  // Initial rotation to position the selected zone at the top
  useEffect(() => {
    // Calculate the angle to rotate to position the selected zone at the top
    const targetRotation = -selectedZone * zoneAngle;
    rotation.value = withTiming(targetRotation, { duration: 500 });
  }, [selectedZone, zoneAngle, rotation]);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startRotation = rotation.value;
    },
    onActive: (event, ctx) => {
      // Calculate rotation based on gesture
      const { translationX, translationY } = event;
      const center = WHEEL_SIZE / 2;
      const angleInRadians = Math.atan2(translationY, translationX);
      const angleInDegrees = (angleInRadians * 180) / Math.PI;
      
      // Apply rotation
      rotation.value = ctx.startRotation + angleInDegrees;
    },
    onEnd: () => {
      // Snap to the nearest zone
      const currentRotation = rotation.value;
      const normalizedRotation = ((currentRotation % 360) + 360) % 360;
      const nearestZoneIndex = Math.round(normalizedRotation / zoneAngle) % TOTAL_ZONES;
      const snappedRotation = -nearestZoneIndex * zoneAngle;
      
      rotation.value = withTiming(snappedRotation, { duration: 300 });
      
      // Call the onZoneSelected callback with the selected zone index
      runOnJS(onZoneSelected)(nearestZoneIndex);
    },
  });
  
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.wheelContainer}>
          <AnimatedSvg
            width={WHEEL_SIZE}
            height={WHEEL_SIZE}
            style={[styles.wheel, animatedStyle]}
          >
            {/* Background Circle */}
            <Circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r={WHEEL_RADIUS - ZONE_WIDTH / 2}
              fill="#f0f0f0"
              stroke="#ccc"
              strokeWidth={1}
            />
            
            {/* Zone Segments */}
            <G>
              {zones.map((zone, index) => {
                const angle = (index * zoneAngle * Math.PI) / 180;
                const innerRadius = WHEEL_RADIUS - ZONE_WIDTH;
                const outerRadius = WHEEL_RADIUS;
                
                // Calculate text position
                const textRadius = innerRadius + (outerRadius - innerRadius) / 2;
                const textX = CENTER_X + textRadius * Math.cos(angle);
                const textY = CENTER_Y + textRadius * Math.sin(angle);
                
                // Calculate line coordinates
                const innerX = CENTER_X + innerRadius * Math.cos(angle);
                const innerY = CENTER_Y + innerRadius * Math.sin(angle);
                const outerX = CENTER_X + outerRadius * Math.cos(angle);
                const outerY = CENTER_Y + outerRadius * Math.sin(angle);
                
                return (
                  <G key={index}>
                    {/* Zone divider line */}
                    <Line
                      x1={innerX}
                      y1={innerY}
                      x2={outerX}
                      y2={outerY}
                      stroke="#999"
                      strokeWidth={1}
                    />
                    
                    {/* Zone label */}
                    <SvgText
                      x={textX}
                      y={textY}
                      fill={index === selectedZone ? '#000' : '#666'}
                      fontSize={16}
                      fontWeight={index === selectedZone ? 'bold' : 'normal'}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      rotation={(index * zoneAngle) + 90}
                      originX={textX}
                      originY={textY}
                    >
                      {ZONE_NAMES[index]}
                    </SvgText>
                  </G>
                );
              })}
            </G>
            
            {/* Tone gradients around the wheel */}
            <G>
              {zones.map((zone, index) => {
                const startAngle = (index * zoneAngle * Math.PI) / 180;
                const endAngle = ((index + 1) * zoneAngle * Math.PI) / 180;
                const midAngle = (startAngle + endAngle) / 2;
                
                const outerRadius = WHEEL_RADIUS;
                const colorMarkerX = CENTER_X + outerRadius * Math.cos(midAngle);
                const colorMarkerY = CENTER_Y + outerRadius * Math.sin(midAngle);
                
                return (
                  <Circle
                    key={`tone-${index}`}
                    cx={colorMarkerX}
                    cy={colorMarkerY}
                    r={8}
                    fill={zone.tone}
                    stroke="#333"
                    strokeWidth={1}
                  />
                );
              })}
            </G>
            
            {/* Center marker */}
            <Circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r={5}
              fill="red"
            />
          </AnimatedSvg>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  wheelContainer: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
  },
  wheel: {
    backgroundColor: 'transparent',
  },
});

export default ZoneWheel; 