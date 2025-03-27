import { useEffect, useRef } from 'react';

export default function Timeline({ 
  duration, 
  currentTime, 
  setCurrentTime, 
  isPlaying, 
  onPlay, 
  onPause,
  startTime,
  endTime
}) {
  const timelineRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    if (isPlaying) {
      const animate = (timestamp) => {
        if (!lastTimeRef.current) {
          lastTimeRef.current = timestamp;
        }
        
        const delta = (timestamp - lastTimeRef.current) / 1000;
        lastTimeRef.current = timestamp;
        
        setCurrentTime(prev => {
          const newTime = prev + delta;
          if (newTime >= duration) {
            onPause();
            return 0;
          }
          return newTime;
        });
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, duration, setCurrentTime, onPause]);

  const handleTimelineClick = (e) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newTime = (clickPosition / rect.width) * duration;
    setCurrentTime(Math.max(0, Math.min(duration, newTime)));
  };

  return (
    <div style={{
      marginTop: '20px',
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div
        ref={timelineRef}
        style={{
          height: '40px',
          backgroundColor: '#e2e8f0',
          position: 'relative',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={handleTimelineClick}
      >
        <div style={{
          position: 'absolute',
          left: `${(startTime / duration) * 100}%`,
          width: `${((endTime - startTime) / duration) * 100}%`,
          height: '100%',
          backgroundColor: '#3b82f6',
          borderRadius: '4px'
        }} />
        
        <div style={{
          position: 'absolute',
          left: `${(currentTime / duration) * 100}%`,
          top: '0',
          height: '100%',
          width: '2px',
          backgroundColor: 'white',
          boxShadow: '0 0 2px rgba(0,0,0,0.5)'
        }} />
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px'
      }}>
        <span style={{ fontSize: '12px' }}>
          {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
        </span>
        
        <button
          onClick={isPlaying ? onPause : onPlay}
          style={{
            padding: '6px 12px',
            backgroundColor: isPlaying ? '#ef4444' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}