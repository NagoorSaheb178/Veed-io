import { useEffect, useRef, forwardRef } from 'react';

const Editor = forwardRef(({ media, mediaProperties, setMediaProperties, isPlaying, currentTime }, ref) => {
  const canvasRef = useRef(null);
  const mediaRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeHandle = useRef(null);

  useEffect(() => {
    if (mediaRef.current && media?.type === 'video') {
      if (isPlaying) {
        mediaRef.current.currentTime = currentTime;
        mediaRef.current.play();
      } else {
        mediaRef.current.pause();
      }
    }
  }, [isPlaying, currentTime, media?.type]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on resize handle
    if (
      x >= mediaProperties.x + mediaProperties.width - 10 &&
      x <= mediaProperties.x + mediaProperties.width + 10 &&
      y >= mediaProperties.y + mediaProperties.height - 10 &&
      y <= mediaProperties.y + mediaProperties.height + 10
    ) {
      resizeHandle.current = { 
        startWidth: mediaProperties.width,
        startHeight: mediaProperties.height
      };
      return;
    }

    // Check if clicked on media
    if (
      x >= mediaProperties.x &&
      x <= mediaProperties.x + mediaProperties.width &&
      y >= mediaProperties.y &&
      y <= mediaProperties.y + mediaProperties.height
    ) {
      isDragging.current = true;
      dragStart.current = {
        x: x - mediaProperties.x,
        y: y - mediaProperties.y
      };
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current && !resizeHandle.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging.current) {
      setMediaProperties(prev => ({
        ...prev,
        x: x - dragStart.current.x,
        y: y - dragStart.current.y
      }));
    } else if (resizeHandle.current) {
      const newWidth = Math.max(50, x - mediaProperties.x);
      const newHeight = Math.max(50, y - mediaProperties.y);
      setMediaProperties(prev => ({
        ...prev,
        width: newWidth,
        height: newHeight
      }));
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    resizeHandle.current = null;
  };

  return (
    <div 
      ref={canvasRef}
      className="editor-canvas"
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        backgroundColor: '#f8f9fa',
        border: '1px dashed #ccc',
        overflow: 'hidden',
        cursor: isDragging.current ? 'grabbing' : 'default'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {media && (
        <div
          style={{
            position: 'absolute',
            left: `${mediaProperties.x}px`,
            top: `${mediaProperties.y}px`,
            width: `${mediaProperties.width}px`,
            height: `${mediaProperties.height}px`,
            border: '2px solid #3b82f6',
            boxSizing: 'border-box',
            display: 
              currentTime >= mediaProperties.startTime && 
              currentTime <= mediaProperties.endTime 
                ? 'block' 
                : 'none'
          }}
        >
          {media.type === 'image' ? (
            <img
              src={media.url}
              alt="Uploaded media"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <video
              ref={mediaRef}
              src={media.url}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              controls={false}
            />
          )}
          <div
            style={{
              position: 'absolute',
              right: '-5px',
              bottom: '-5px',
              width: '10px',
              height: '10px',
              backgroundColor: '#3b82f6',
              cursor: 'nwse-resize'
            }}
          />
        </div>
      )}
    </div>
  );
});

Editor.displayName = 'Editor';

export default Editor;