export default function Sidebar({ mediaProperties, setMediaProperties, onFileUpload }) {
  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setMediaProperties(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setMediaProperties(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  return (
    <div style={{
      width: '280px',
      backgroundColor: 'white',
      borderRight: '1px solid #e9ecef',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '12px',
          color: '#495057'
        }}>Add Media</h3>
        
        <input 
          type="file" 
          accept="image/*,video/*"
          onChange={onFileUpload}
          style={{ display: 'none' }}
          id="media-upload"
        />
        <label
          htmlFor="media-upload"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px',
            borderRadius: '6px',
            marginBottom: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            backgroundColor: '#f1f5f9',
            border: '1px dashed #94a3b8'
          }}
        >
          Upload a File
        </label>
      </div>

      {mediaProperties && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#495057'
          }}>Media Properties</h3>
          
          <div style={{ marginBottom: '12px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              marginBottom: '4px',
              color: '#64748b'
            }}>Width</label>
            <input
              type="number"
              name="width"
              value={mediaProperties.width}
              onChange={handleDimensionChange}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              marginBottom: '4px',
              color: '#64748b'
            }}>Height</label>
            <input
              type="number"
              name="height"
              value={mediaProperties.height}
              onChange={handleDimensionChange}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              marginBottom: '4px',
              color: '#64748b'
            }}>Start Time (s)</label>
            <input
              type="number"
              name="startTime"
              value={mediaProperties.startTime}
              onChange={handleTimeChange}
              step="0.1"
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              marginBottom: '4px',
              color: '#64748b'
            }}>End Time (s)</label>
            <input
              type="number"
              name="endTime"
              value={mediaProperties.endTime}
              onChange={handleTimeChange}
              step="0.1"
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}