import { create } from 'zustand';

interface DroneState {
  x: number;
  y: number;
  height: number; // 0 - 200 (meters/units)
  rotation: number; // 0 - 360 degrees
  
  // Inputs (normalized -1 to 1)
  throttle: number; // Up/Down (Left Stick Y)
  yaw: number;      // Rotate (Left Stick X)
  pitch: number;    // Forward/Back (Right Stick Y)
  roll: number;     // Left/Right (Right Stick X)

  setInputs: (inputs: Partial<{ throttle: number; yaw: number; pitch: number; roll: number }>) => void;
  updatePhysics: () => void;
  reset: () => void;
}

export const useDroneStore = create<DroneState>((set) => ({
  x: 300,
  y: 300,
  height: 0,
  rotation: 0,
  
  throttle: 0,
  yaw: 0,
  pitch: 0,
  roll: 0,

  setInputs: (inputs) => set((state) => ({ ...state, ...inputs })),

  updatePhysics: () => set((state) => {
    // Simple Physics Model
    const speed = 2; // Movement speed
    const rotationSpeed = 2; // Rotation speed in degrees
    const liftSpeed = 1; // Vertical speed

    let { x, y, height, rotation } = state;

    // 1. Rotation (Yaw) - Left Stick X
    if (Math.abs(state.yaw) > 0.1) {
      rotation += state.yaw * rotationSpeed;
    }

    // 2. Height (Throttle) - Left Stick Y
    // Invert Y input (up is negative in screen, but we want positive for height)
    // Usually joystick up = -1. So -state.throttle is positive.
    if (Math.abs(state.throttle) > 0.1) {
      height -= state.throttle * liftSpeed;
      height = Math.max(0, Math.min(height, 200)); // Clamp height
    }

    // 3. Movement (Pitch & Roll) - Right Stick
    // Pitch (Forward/Back) -> Y axis (relative to drone)
    // Roll (Left/Right) -> X axis (relative to drone)
    
    // Convert local movement to global coordinates based on rotation
    const rad = (rotation * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // Forward/Back (Pitch) - Right Stick Y (Up is -1, means Forward)
    // So -pitch is forward speed.
    const forwardSpeed = -state.pitch * speed;
    
    // Left/Right (Roll) - Right Stick X (Right is 1)
    const sideSpeed = state.roll * speed;

    if (Math.abs(state.pitch) > 0.1 || Math.abs(state.roll) > 0.1) {
      // Apply rotation matrix
      // New X = Forward * sin(angle) + Side * cos(angle)  (Standard trig depends on 0 angle)
      // If 0 is pointing UP (Screen -Y), then:
      // dx = side * cos - forward * sin ?
      // Let's assume 0 is Right (Screen +X).
      // Then Forward (Screen -Y) is -90deg.
      // Let's stick to standard: 0 is Right (X+), 90 is Down (Y+).
      // If drone faces 0 (Right), Forward is X+, Side is Y+.
      
      // Let's simplify:
      // dx = forward * cos(rad) - side * sin(rad)
      // dy = forward * sin(rad) + side * cos(rad)
      
      // Wait, let's test.
      // If rotation = 0 (Right). Forward (X+) -> dx = 1, dy = 0. Correct.
      // If rotation = 90 (Down). Forward (Y+) -> dx = 0, dy = 1. Correct.
      
      x += forwardSpeed * cos - sideSpeed * sin;
      y += forwardSpeed * sin + sideSpeed * cos;
    }

    // Boundary Check (Simple 0-600 box for now, canvas size might vary)
    // Ideally pass boundaries to this function or store them.
    // For V1, we clamp loosely.
    x = Math.max(0, Math.min(x, 2000)); 
    y = Math.max(0, Math.min(y, 2000));

    return { x, y, height, rotation };
  }),

  reset: () => set({ x: 300, y: 300, height: 0, rotation: 0, throttle: 0, yaw: 0, pitch: 0, roll: 0 })
}));
