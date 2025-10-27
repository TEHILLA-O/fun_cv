# Custom TargetCursor Integration Guide

## 🎯 **Already Integrated Files:**

1. ✅ `components/TargetCursor.tsx` - The main cursor component
2. ✅ `components/TargetCursor.css` - Cursor styles  
3. ✅ `app/ClientLayout.tsx` - Client wrapper with cursor
4. ✅ `app/layout.tsx` - Root layout updated
5. ✅ `app/globals.css` - Added cursor-target class

## 🔧 **How to Use:**

### **Add to any interactive element:**
```tsx
<button className="cursor-target">
  Click me
</button>
```

### **The cursor will:**
- ✨ **Auto-rotate** when hovering over `.cursor-target` elements
- 🎯 **Create a box** around interactive elements
- 💫 **Animate** on hover and click
- 🎨 **Mix-blend-mode: difference** for visibility

### **Available Props:**
```tsx
<TargetCursor 
  targetSelector=".cursor-target"  // What to target
  spinDuration={3}                 // Rotation speed (seconds)
  hideDefaultCursor={true}        // Hide system cursor
/>
```

## 📝 **Usage Examples:**

### **1. Add to Buttons:**
```tsx
<button className="cursor-target px-4 py-2 bg-pixel-green">
  Download
</button>
```

### **2. Add to Links:**
```tsx
<a href="#" className="cursor-target">
  Learn More
</a>
```

### **3. Add to Cards:**
```tsx
<div className="cursor-target card">
  Project card
</div>
```

## 🎨 **Customization:**

Edit `components/TargetCursor.css` to change:
- Corner size: `width: 12px;`
- Border width: `border: 3px solid #fff;`
- Animation speeds in the component

## ⚡ **Current Status:**

The cursor is **ready to use**! Just add `className="cursor-target"` to any element you want to animate with the custom cursor.

## 🚀 **Features:**

- ✅ Auto-rotates around interactive elements
- ✅ Creates corner boxes on hover
- ✅ Click animation (scale down)
- ✅ Smooth GSAP animations
- ✅ Mix-blend-mode for visibility on any background
- ✅ Parallax effect on movement
- ✅ Scroll handling
- ✅ Cleanup on unmount
