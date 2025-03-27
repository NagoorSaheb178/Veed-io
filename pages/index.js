import { useState, useRef } from 'react';
import Head from 'next/head';
import Editor from '../components/Editor';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [media, setMedia] = useState(null);
  const [mediaProperties, setMediaProperties] = useState({
    width: 300,
    height: 200,
    x: 100,
    y: 100,
    startTime: 0,
    endTime: 5,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const editorRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMedia({
        url,
        type: file.type.startsWith('video') ? 'video' : 'image'
      });
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>VEED.IO Clone</title>
        <meta name="description" content="A simplified VEED.IO clone" />
      </Head>

      <main className={styles.main}>
        <Sidebar 
          mediaProperties={mediaProperties}
          setMediaProperties={setMediaProperties}
          onFileUpload={handleFileUpload}
        />
        
        <div className={styles.editorContainer}>
          <Editor
            ref={editorRef}
            media={media}
            mediaProperties={mediaProperties}
            setMediaProperties={setMediaProperties}
            isPlaying={isPlaying}
            currentTime={currentTime}
          />
          
          <Timeline
            duration={10}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            startTime={mediaProperties.startTime}
            endTime={mediaProperties.endTime}
          />
        </div>
      </main>
    </div>
  );
}