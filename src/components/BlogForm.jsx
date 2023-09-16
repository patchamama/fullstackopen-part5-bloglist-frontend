const BlogForm = ({
  onSubmit,
  handleTitle,
  handleAuthor,
  handleNewURL,
  newTitle,
  newAuthor,
  newUrl,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        title:
        <input value={newTitle} onChange={handleTitle} />
        <br />
        author:
        <input value={newAuthor} onChange={handleAuthor} />
        <br />
        url:
        <input value={newUrl} onChange={handleNewURL} />
        <br />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
