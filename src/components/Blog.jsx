import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <span style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>view</button>
      </span>
      <span style={showWhenVisible}>
        <button onClick={() => setVisible(false)}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}{' '}
        <button onClick={() => console.log('like')}>like</button>
        <br />
        {blog.user?.name}
      </span>
    </div>
  )
}

export default Blog
