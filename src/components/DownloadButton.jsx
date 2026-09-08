function DownloadButton({ downloadUrl, filename }) {
  if (!downloadUrl) return null;

  return (
    <a
      href={downloadUrl}
      download={filename}
      style={{
        display: 'inline-block',
        marginTop: '1rem',
        padding: '0.6rem 1.2rem',
        backgroundColor: '#16a34a',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '6px',
      }}
    >
      Download Audio
    </a>
  );
}

export default DownloadButton;