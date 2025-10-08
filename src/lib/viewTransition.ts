// View Transition API utility
export const startViewTransition = (callback: () => void | Promise<void>) => {
  // Check if View Transitions API is supported
  if (!document.startViewTransition) {
    callback();
    return;
  }

  document.startViewTransition(async () => {
    await callback();
  });
};

// Add view transition styles
export const addViewTransitionStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation-duration: 0.3s;
    }
    
    ::view-transition-old(root) {
      animation-name: fade-out;
    }
    
    ::view-transition-new(root) {
      animation-name: fade-in;
    }
    
    @keyframes fade-out {
      to {
        opacity: 0;
      }
    }
    
    @keyframes fade-in {
      from {
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

// Initialize view transitions on app load
if (typeof window !== 'undefined') {
  addViewTransitionStyles();
}
