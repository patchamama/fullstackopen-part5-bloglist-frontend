import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMsg, setNotificationMsg] = useState({
    type: null,
    msg: null,
  })

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    setNotificationMsg({
      type: 'ok',
      msg: `${user.name} is logged out!`,
    })
    setTimeout(() => {
      setNotificationMsg({ type: null, msg: null })
      window.localStorage.removeItem('loggedNoteappUser')
      setUser(null)
    }, 2000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      console.log(window.localStorage)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMsg({
        type: 'ok',
        msg: `Logged-in with user ${user.name}!`,
      })
      setTimeout(() => {
        setNotificationMsg({ type: null, msg: null })
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setNotificationMsg({
        type: 'error',
        msg: 'Wrong credentials',
      })
      setTimeout(() => {
        setNotificationMsg({ type: null, msg: null })
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={notificationMsg} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))

        setNotificationMsg({ type: 'ok', msg: `Added ${title}!` })
        setTimeout(() => {
          setNotificationMsg({ type: null, msg: null })
        }, 5000)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
      .catch((error) => {
        setNotificationMsg({
          type: 'error',
          msg: error.response.data.error,
        })
        setTimeout(() => {
          setNotificationMsg({ type: null, msg: null })
        }, 5000)
        console.log(error)
      })
  }

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
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

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMsg} />
      {user.name} logged-in <button onClick={logout}>logout</button>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
