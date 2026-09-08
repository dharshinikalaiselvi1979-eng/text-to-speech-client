function TextInput({ text, setText, maxLength }) {
  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        Enter your text:
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
        placeholder="Type or paste text here..."
      />
      <div style={{ fontSize: '0.85rem', color: charCount > maxLength ? 'red' : '#555' }}>
        Characters: {charCount} / {maxLength} &nbsp;|&nbsp; Words: {wordCount}
      </div>
    </div>
  );
}

export default TextInput;