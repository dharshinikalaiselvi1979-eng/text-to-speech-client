function GenerateButton({ onClick, loading, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        backgroundColor: loading || disabled ? '#ccc' : '#4f46e5',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
      }}
    >
      {loading ? 'Generating...' : 'Generate Speech'}
    </button>
  );
}

export default GenerateButton;