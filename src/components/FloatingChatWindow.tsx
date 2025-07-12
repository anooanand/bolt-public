/* Enhanced Attached Chat Window Styles with Space Utilization */
.attached-chat-container.enhanced-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 480px;
  height: 100vh;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
}

.attached-chat-container.enhanced-panel.minimized {
  height: 60px;
}

.attached-chat-container.enhanced-panel.collapsed {
  width: 60px;
}

.attached-chat-container.enhanced-panel.collapsed.minimized {
  width: 60px;
  height: 60px;
}

.dark .attached-chat-container.enhanced-panel {
  background: rgba(30, 41, 59, 0.98);
  border-left-color: rgba(148, 163, 184, 0.3);
}

.attached-chat-header.enhanced-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  user-select: none;
  min-height: 60px;
  box-sizing: border-box;
  position: relative;
}

.attached-chat-container.enhanced-panel.collapsed .attached-chat-header.enhanced-header {
  padding: 12px 8px;
  justify-content: center;
}

.header-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.header-content h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: white !important;
  line-height: 1.2;
}

.header-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
}

.attached-chat-controls.enhanced-controls {
  display: flex;
  gap: 6px;
  align-items: center;
}

.attached-chat-container.enhanced-panel.collapsed .attached-chat-controls.enhanced-controls {
  flex-direction: column;
  gap: 4px;
}

.attached-chat-control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 6px;
  padding: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
  position: relative;
}

.attached-chat-control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.collapse-btn {
  background: rgba(34, 197, 94, 0.3) !important;
  border: 1px solid rgba(34, 197, 94, 0.5);
}

.collapse-btn:hover {
  background: rgba(34, 197, 94, 0.5) !important;
}

.minimize-btn {
  background: rgba(59, 130, 246, 0.3) !important;
  border: 1px solid rgba(59, 130, 246, 0.5);
}

.minimize-btn:hover {
  background: rgba(59, 130, 246, 0.5) !important;
}

.close-btn {
  background: rgba(239, 68, 68, 0.3) !important;
  border: 1px solid rgba(239, 68, 68, 0.5);
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.5) !important;
}

.attached-chat-content.enhanced-content {
  height: calc(100% - 60px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.attached-chat-container.enhanced-panel.minimized .attached-chat-content.enhanced-content {
  display: none;
}

.attached-chat-container.enhanced-panel.collapsed .attached-chat-content.enhanced-content {
  display: none;
}

.floating-chat-toggle.enhanced-toggle {
  position: fixed;
  top: 50%;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transform: translateY(-50%);
  position: relative;
  overflow: visible;
}

.floating-chat-toggle.enhanced-toggle:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
}

.toggle-tooltip {
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.floating-chat-toggle.enhanced-toggle:hover .toggle-tooltip {
  opacity: 1;
}

.space-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(34, 197, 94, 0.9);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(34, 197, 94, 0.3);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

/* Legacy styles for backward compatibility */
.attached-chat-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 480px;
  height: 100vh;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
}

.attached-chat-container.minimized {
  height: 60px;
}

.attached-chat-container.collapsed {
  width: 60px;
}

.attached-chat-container.collapsed.minimized {
  width: 60px;
  height: 60px;
}

.dark .attached-chat-container {
  background: rgba(30, 41, 59, 0.98);
  border-left-color: rgba(148, 163, 184, 0.3);
}

.attached-chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  user-select: none;
  min-height: 60px;
  box-sizing: border-box;
}

.attached-chat-container.collapsed .attached-chat-header {
  padding: 12px 8px;
  justify-content: center;
}

.attached-chat-container.collapsed .attached-chat-header h3 {
  display: none;
}

.attached-chat-container.collapsed .attached-chat-header .flex {
  justify-content: center;
}

.attached-chat-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: white !important;
}

.attached-chat-controls {
  display: flex;
  gap: 8px;
}

.attached-chat-container.collapsed .attached-chat-controls {
  flex-direction: column;
  gap: 4px;
}

.attached-chat-content {
  height: calc(100% - 60px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.attached-chat-container.minimized .attached-chat-content {
  display: none;
}

.attached-chat-container.collapsed .attached-chat-content {
  display: none;
}

.floating-chat-toggle {
  position: fixed;
  top: 50%;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transform: translateY(-50%);
}

.floating-chat-toggle:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
}

.floating-chat-toggle.hidden {
  display: none;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .attached-chat-container,
  .attached-chat-container.enhanced-panel {
    width: 100vw;
    height: 50vh;
    top: auto;
    bottom: 0;
    right: 0;
    border-left: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .attached-chat-container.minimized,
  .attached-chat-container.enhanced-panel.minimized {
    height: 60px;
  }
  
  .attached-chat-container.collapsed,
  .attached-chat-container.enhanced-panel.collapsed {
    width: 100vw;
    height: 60px;
  }
  
  .floating-chat-toggle,
  .floating-chat-toggle.enhanced-toggle {
    bottom: 20px;
    right: 20px;
    top: auto;
    transform: none;
  }
  
  .floating-chat-toggle:hover,
  .floating-chat-toggle.enhanced-toggle:hover {
    transform: scale(1.1);
  }
  
  .toggle-tooltip {
    right: auto;
    left: 70px;
  }
}

/* Animation for showing/hiding */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.attached-chat-container.show,
.attached-chat-container.enhanced-panel.show {
  animation: slideInRight 0.3s ease-out;
}

.attached-chat-container.hide,
.attached-chat-container.enhanced-panel.hide {
  animation: slideOutRight 0.3s ease-in;
}

/* Ensure main content adjusts for attached panel */
.main-content-with-attached-chat {
  padding-right: 420px !important;
  transition: padding-right 0.3s ease;
}

.main-content-with-attached-chat.collapsed {
  padding-right: 80px !important;
}

.main-content-with-attached-chat.hidden {
  padding-right: 0 !important;
}

/* Override split screen when attached chat is enabled */
.split-screen-container.with-floating-chat {
  display: block !important;
  margin-right: 0;
}

.split-screen-container.with-floating-chat .split-screen-right {
  display: none !important;
}

.split-screen-container.with-floating-chat .split-screen-left {
  flex: 1 !important;
  border-radius: 8px !important;
  max-width: 100%;
}

/* Better visual feedback for interactive elements */
.attached-chat-header:hover,
.attached-chat-header.enhanced-header:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%);
}

/* Ensure proper stacking context */
.attached-chat-container,
.attached-chat-container.enhanced-panel {
  isolation: isolate;
}

/* Smooth transitions for collapse/expand */
.attached-chat-container,
.attached-chat-container.enhanced-panel {
  transition: width 0.3s ease, height 0.3s ease;
}

.attached-chat-header,
.attached-chat-header.enhanced-header {
  transition: padding 0.3s ease;
}

.attached-chat-controls,
.attached-chat-controls.enhanced-controls {
  transition: flex-direction 0.3s ease, gap 0.3s ease;
}

/* Mobile-specific adjustments for bottom panel */
@media (max-width: 768px) {
  .main-content-with-attached-chat {
    padding-right: 0 !important;
    padding-bottom: 50vh !important;
  }
  
  .main-content-with-attached-chat.collapsed {
    padding-bottom: 80px !important;
  }
  
  .main-content-with-attached-chat.hidden {
    padding-bottom: 0 !important;
  }
}

.attached-chat-container.minimized {
  height: 60px;
}

.attached-chat-container.collapsed {
  width: 60px;
}

.attached-chat-container.collapsed.minimized {
  width: 60px;
  height: 60px;
}

.dark .attached-chat-container {
  background: rgba(30, 41, 59, 0.98);
  border-left-color: rgba(148, 163, 184, 0.3);
}

.attached-chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  user-select: none;
  min-height: 60px;
  box-sizing: border-box;
}

.attached-chat-container.collapsed .attached-chat-header {
  padding: 12px 8px;
  justify-content: center;
}

.attached-chat-container.collapsed .attached-chat-header h3 {
  display: none;
}

.attached-chat-container.collapsed .attached-chat-header .flex {
  justify-content: center;
}

.attached-chat-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: white !important;
}

.attached-chat-controls {
  display: flex;
  gap: 8px;
}

.attached-chat-container.collapsed .attached-chat-controls {
  flex-direction: column;
  gap: 4px;
}

.attached-chat-control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 6px;
  padding: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
}

.attached-chat-control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.attached-chat-content {
  height: calc(100% - 60px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.attached-chat-container.minimized .attached-chat-content {
  display: none;
}

.attached-chat-container.collapsed .attached-chat-content {
  display: none;
}

.floating-chat-toggle {
  position: fixed;
  top: 50%;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transform: translateY(-50%);
}

.floating-chat-toggle:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
}

.floating-chat-toggle.hidden {
  display: none;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .attached-chat-container {
    width: 100vw;
    height: 50vh;
    top: auto;
    bottom: 0;
    right: 0;
    border-left: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .attached-chat-container.minimized {
    height: 60px;
  }
  
  .attached-chat-container.collapsed {
    width: 100vw;
    height: 60px;
  }
  
  .floating-chat-toggle {
    bottom: 20px;
    right: 20px;
    top: auto;
    transform: none;
  }
  
  .floating-chat-toggle:hover {
    transform: scale(1.1);
  }
}

/* Animation for showing/hiding */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.attached-chat-container.show {
  animation: slideInRight 0.3s ease-out;
}

.attached-chat-container.hide {
  animation: slideOutRight 0.3s ease-in;
}

/* Ensure main content adjusts for attached panel */
.main-content-with-attached-chat {
  padding-right: 420px !important;
  transition: padding-right 0.3s ease;
}

.main-content-with-attached-chat.collapsed {
  padding-right: 80px !important;
}

.main-content-with-attached-chat.hidden {
  padding-right: 0 !important;
}

/* Override split screen when attached chat is enabled */
.split-screen-container.with-floating-chat {
  display: block !important;
  margin-right: 0;
}

.split-screen-container.with-floating-chat .split-screen-right {
  display: none !important;
}

.split-screen-container.with-floating-chat .split-screen-left {
  flex: 1 !important;
  border-radius: 8px !important;
  max-width: 100%;
}

/* Better visual feedback for interactive elements */
.attached-chat-header:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%);
}

/* Ensure proper stacking context */
.attached-chat-container {
  isolation: isolate;
}

/* Smooth transitions for collapse/expand */
.attached-chat-container {
  transition: width 0.3s ease, height 0.3s ease;
}

.attached-chat-header {
  transition: padding 0.3s ease;
}

.attached-chat-controls {
  transition: flex-direction 0.3s ease, gap 0.3s ease;
}

/* Mobile-specific adjustments for bottom panel */
@media (max-width: 768px) {
  .main-content-with-attached-chat {
    padding-right: 0 !important;
    padding-bottom: 50vh !important;
  }
  
  .main-content-with-attached-chat.collapsed {
    padding-bottom: 80px !important;
  }
  
  .main-content-with-attached-chat.hidden {
    padding-bottom: 0 !important;
  }
}