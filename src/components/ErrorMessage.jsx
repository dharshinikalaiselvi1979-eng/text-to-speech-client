function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        borderRadius: '6px',
        border: '1px solid #fca5a5',
      }}
    >
      ⚠ {message}
    </div>
  );
}

export default ErrorMessage;