import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        title:
        <input
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
        <br />
        author:
        <input
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
        <br />
        url:
        <input
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        />
        <br />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
