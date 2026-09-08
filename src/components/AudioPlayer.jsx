function AudioPlayer({ audioUrl }) {
  if (!audioUrl) return null;

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <h3>Generated Audio</h3>
      <audio controls src={audioUrl} style={{ width: '100%' }}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayer;