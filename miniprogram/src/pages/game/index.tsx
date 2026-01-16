import { View, Text } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { useDroneStore } from '../../store/useDroneStore';
import Joystick from '../../components/game/Joystick';
import CityCanvas from '../../components/game/CityCanvas';
import Taro from '@tarojs/taro';

export default function GamePage() {
  const { setInputs, updatePhysics, reset, height, x, y } = useDroneStore();
  // Safe area for iPhone X/11/12/13/14/15/16 series
  const [safeAreaTop, setSafeAreaTop] = useState(44);
  const [safeAreaBottom, setSafeAreaBottom] = useState(34);

  useEffect(() => {
    const info = Taro.getSystemInfoSync();
    if (info.safeArea) {
      setSafeAreaTop(info.safeArea.top);
      // Bottom safe area usually needed for home indicator
      const bottom = info.screenHeight - info.safeArea.bottom;
      setSafeAreaBottom(bottom > 0 ? bottom : 20);
    }
  }, []);
  
  // Physics Loop
  useEffect(() => {
    const timer = setInterval(() => {
      updatePhysics();
    }, 16); // ~60fps
    
    return () => clearInterval(timer);
  }, [updatePhysics]);

  useEffect(() => {
    reset();
  }, []);

  return (
    <View className="flex flex-col h-screen bg-slate-900 overflow-hidden relative">
      {/* HUD Layer - Top */}
      <View 
        className="absolute left-0 w-full z-10 pointer-events-none flex justify-between px-4"
        style={{ top: `${safeAreaTop}px` }}
      >
         <View className="bg-black backdrop-blur-md p-3 rounded-xl text-white border border-white shadow-lg bg-opacity-60 border-opacity-10">
            <View className="text-xs text-slate-400 mb-1">高度 (Height)</View>
            <View className="text-xl font-mono font-bold text-blue-400">{height.toFixed(1)} <Text className="text-sm text-white">m</Text></View>
         </View>
         
         <View className="flex gap-2">
            <View className="bg-black backdrop-blur-md p-3 rounded-xl text-white border border-white shadow-lg bg-opacity-60 border-opacity-10">
                <View className="text-xs text-slate-400 mb-1">电量 (BAT)</View>
                <View className="text-xl font-mono font-bold text-green-400">85%</View>
            </View>
         </View>
      </View>

      {/* Main Viewport */}
      <View className="flex-1 relative w-full h-full">
        <CityCanvas />
        
        {/* Center Crosshair */}
        <View 
            className="absolute w-4 h-4 border-2 border-white rounded-full pointer-events-none border-opacity-30" 
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
        <View 
            className="absolute w-1 h-1 bg-white rounded-full pointer-events-none bg-opacity-50"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      </View>

      {/* Controls - Bottom */}
      <View 
        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 via-slate-900 to-transparent pt-12 pb-4 px-8 flex flex-row items-center justify-between shrink-0 pointer-events-none"
        style={{ paddingBottom: `${safeAreaBottom + 20}px` }}
      >
        {/* Left Stick Container */}
        <View className="pointer-events-auto relative">
          <Joystick 
            id="stick-left"
            label="油门 / 转向"
            color="bg-blue-500"
            onMove={(x, y) => setInputs({ yaw: x, throttle: -y })} 
          />
          <View className="absolute -bottom-6 w-full text-center text-slate-500 font-bold tracking-wider" style={{ fontSize: '10px' }}>THROTTLE</View>
        </View>
        
        {/* Right Stick Container */}
        <View className="pointer-events-auto relative">
          <Joystick 
            id="stick-right"
            label="平移 / 前后"
            color="bg-green-500"
            onMove={(x, y) => setInputs({ roll: x, pitch: y })}
          />
           <View className="absolute -bottom-6 w-full text-center text-slate-500 font-bold tracking-wider" style={{ fontSize: '10px' }}>PITCH/ROLL</View>
        </View>
      </View>
    </View>
  );
}
