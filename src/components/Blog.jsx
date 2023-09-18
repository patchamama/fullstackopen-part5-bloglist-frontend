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
    // console.log(newBlog)
    try {
      const updatedBlog = await blogService.update(blog.id, newBlog)

      // to fix the bug of not showing the user's name when creating a new blog
      const getUpdatedBlog = await blogService.get(blog.id)
      // console.log(getUpdatedBlog)
      if ('user' in getUpdatedBlog) {
        updatedBlog.user = getUpdatedBlog.user
      }

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

  const handleRemove = async () => {
    if (!window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      return
    }
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((blogItem) => blogItem.id !== blog.id))
      setNotificationMsg({ type: 'ok', msg: `Removed "${blog.title}"!` })
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
        <a href='{blog.url}' target='_blank'>
          {blog.url}
        </a>
        <br />
        likes {blog.likes} <button onClick={handleLike}>like</button>
        <br />
        {blog.user?.name}
        <br />
        {/* {console.log(blog.user?.name, window.localStorage)} */}
        {blog.user?.name &&
          'loggedBlogappUser' in window.localStorage &&
          blog.user?.name ===
            JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
              .name && <button onClick={handleRemove}>remove</button>}
      </span>
    </div>
  )
}

export default Blog
