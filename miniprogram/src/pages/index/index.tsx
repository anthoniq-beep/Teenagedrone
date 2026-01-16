import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

export default function Index() {
  const startGame = () => {
    Taro.navigateTo({ url: '/pages/game/index' })
  }

  return (
    <View className="flex flex-col h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <View className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <View className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-500 blur-3xl" style={{ marginTop: '-10%', marginRight: '-10%' }} />
        <View className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-purple-500 blur-3xl" style={{ marginBottom: '-10%', marginLeft: '-10%' }} />
      </View>

      {/* Content */}
      <View className="flex-1 flex flex-col items-center justify-center p-6 z-10">
        {/* Title Section */}
        <View className="mb-12 text-center">
          <View className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            飞行挑战
          </View>
          <View className="text-sm text-slate-400 tracking-widest uppercase">
            Teenage Drone Challenge
          </View>
        </View>
        
        {/* Menu Buttons */}
        <View className="w-full max-w-xs flex flex-col gap-4">
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl shadow-lg active:scale-95 transition-all font-bold text-lg border-none"
            onClick={startGame}
          >
            开始飞行
          </Button>
          
          <Button 
            className="w-full bg-slate-800 text-slate-200 py-4 rounded-xl shadow border border-slate-700 active:bg-slate-800 transition-all backdrop-blur-sm bg-opacity-50"
            onClick={() => Taro.showToast({ title: '暂未开放', icon: 'none' })}
          >
            我的机库
          </Button>

          <Button 
            className="w-full bg-slate-800 text-slate-200 py-4 rounded-xl shadow border border-slate-700 active:bg-slate-800 transition-all backdrop-blur-sm bg-opacity-50"
            onClick={() => Taro.showToast({ title: '暂未开放', icon: 'none' })}
          >
            排行榜
          </Button>
        </View>
      </View>
      
      {/* Footer */}
      <View className="pb-8 text-center z-10">
        <View className="text-xs text-slate-600" style={{ fontSize: '10px' }}>
          v1.0.0 Alpha • Powered by TeenageDrone
        </View>
      </View>
    </View>
  )
}
