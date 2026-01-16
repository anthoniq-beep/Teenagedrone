# 青少年无人机飞行挑战 - 技术架构文档 (Taro + React)

## 1. 技术栈选择

| 模块 | 技术选型 | 原因 |
|------|----------|------|
| **多端框架** | **Taro 3.x** | 支持使用 React 开发小程序，生态成熟，易于迁移现有 React 代码。 |
| **UI 框架** | **React 18** | 保持与 Web 端一致的技术栈，复用组件逻辑。 |
| **状态管理** | **Zustand** | 轻量级，适合高频游戏状态更新（无人机坐标、物理计算）。 |
| **样式库** | **Tailwind CSS (weapp适配版)** | 快速构建 UI，需配置 `rem` 转 `rpx`。 |
| **游戏渲染** | **Taro Canvas 2D** | 微信小程序原生 Canvas 2D 接口，性能优于旧版，适合 2D/2.5D 游戏。 |
| **后端服务** | **Supabase** | 复用现有项目，存储用户数据、排行榜、关卡配置。 |
| **认证** | **WeChat Login** | 结合 Supabase Edge Functions 处理 `code2session`。 |

## 2. 项目结构设计

建议在现有仓库根目录下创建一个新的 `miniprogram` 目录，作为一个独立的 Taro 项目，但可以引用根目录的 `shared` 逻辑（如果配置了 Monorepo）。鉴于简单性，我们将直接在 `miniprogram` 文件夹内构建完整应用。

```text
/miniprogram
  /config               # 环境配置
  /src
    /assets             # 图片、音频资源
    /components
      /game             # 游戏相关组件
        Joystick.tsx    # 适配 Touch 事件的虚拟摇杆
        Drone.tsx       # 无人机渲染逻辑
        CityMap.tsx     # 地图渲染逻辑
        HUD.tsx         # 抬头显示器
      /ui               # 通用 UI 组件
    /hooks              # 自定义 Hooks
    /pages              # 页面路由
      /index            # 游戏大厅
      /game             # 飞行主界面
      /profile          # 个人中心
      /rank             # 排行榜
    /store              # Zustand Stores
      useDroneStore.ts  # 物理引擎核心（可从 Web 版迁移）
      useGameStore.ts   # 关卡状态、积分
    /utils              # 工具函数
      physics.ts        # 碰撞检测、移动计算
      canvas.ts         # Canvas 辅助函数
    app.config.ts       # 小程序全局配置
    app.tsx             # 入口文件
    app.css             # 全局样式
  package.json
  tsconfig.json
```

## 3. 核心技术难点与解决方案

### 3.1 游戏循环 (Game Loop)
小程序中通过 `requestAnimationFrame` 实现游戏循环。
Taro 中需要在 Canvas 组件的 `onReady` 或 `useEffect` 中获取 Canvas 节点，并开启循环。

```typescript
// 伪代码示例
const renderLoop = () => {
  updatePhysics(); // 计算下一帧位置
  drawScene(ctx);  // 绘制
  canvas.requestAnimationFrame(renderLoop);
}
```

### 3.2 触摸事件与多点触控
无人机操控需要双摇杆同时操作，涉及多点触控。
- **解决方案**：使用 `View` 组件包裹摇杆区域，监听 `onTouchMove`。需要区分 `touch.identifier` 来分别处理左右手的触摸点，避免冲突。

### 3.3 物理引擎适配
现有的 `useDroneStore.ts` 中的物理计算逻辑（`updatePhysics`）是纯 JS 逻辑，可以直接复用。
- **优化**：在小程序端，由于 JS 线程和 UI 线程分离（逻辑层与渲染层），频繁的 `setData` 会导致性能问题。
- **策略**：
  1. **不要**把每一帧的 x,y 坐标存入 React State。
  2. 使用 `Ref` 或 `Zustand` 的 `getState()` 在 `requestAnimationFrame` 中直接读取最新坐标进行 Canvas 绘制。
  3. 只有低频状态（如分数变化、游戏结束）才触发 React 重渲染更新 UI。

### 3.4 资源加载
图片和音频资源需要预加载。
- 使用 `Taro.createImage` 创建图片对象供 Canvas 绘制。
- 使用 `Taro.createInnerAudioContext` 播放音效。

## 4. 数据流与后端集成

### 4.1 用户登录
1. 前端调用 `Taro.login()` 获取 `code`。
2. 发送 `code` 到 Supabase Edge Function。
3. Edge Function 调用微信接口获取 `openid`。
4. 在 `users` 表中查找或创建用户，返回 Supabase JWT。

### 4.2 排行榜数据
- **Schema**: `scores` 表
  - `user_id`: UUID
  - `level_id`: String
  - `score`: Integer
  - `time_spent`: Integer
  - `created_at`: Timestamp

## 5. 开发路线图

1. **Phase 1: 基础框架搭建**
   - 初始化 Taro 项目。
   - 配置 Tailwind CSS。
   - 实现底部导航栏和游戏大厅 UI。

2. **Phase 2: 核心玩法迁移**
   - 移植 `useDroneStore`。
   - 重写 `Joystick` 组件适配 Taro Touch 事件。
   - 实现 Canvas 基础渲染（无人机、背景）。

3. **Phase 3: 游戏逻辑完善**
   - 添加碰撞检测。
   - 实现关卡目标判定（穿越圆环逻辑）。
   - 增加计分系统。

4. **Phase 4: 微信功能与优化**
   - 接入登录和排行榜。
   - 性能优化（Canvas 帧率优化）。
   - 发布上线。
