import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, setNotificationMsg }) => {
  const [visible, setVisible] = useState(false)
  const [newLikes, setNewLikes] = useState(0)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleLike = async () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    console.log(newBlog)
    try {
      const updatedBlog = await blogService.update(blog.id, newBlog)
      setBlogs((blogs) =>
        blogs.map((blogItem) =>
          blogItem.id !== updatedBlog.id ? blogItem : updatedBlog
        )
      )
      setNotificationMsg({ type: 'ok', msg: `Updated "${blog.title}"!` })
      setTimeout(() => {
        setNotificationMsg({ type: null, msg: null })
      }, 5000)
    } catch (error) {
      setNotificationMsg({
        type: 'error',
        msg: error.stack,
      })
      setTimeout(() => {
        setNotificationMsg({ type: null, msg: null })
      }, 5000)
      console.log(error)
    }
  }

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
        likes {blog.likes} <button onClick={handleLike}>like</button>
        <br />
        {blog.user?.name}
      </span>
    </div>
  )
}

export default Blog
