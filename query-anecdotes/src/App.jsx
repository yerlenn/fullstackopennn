import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './NotificationContext'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return { visible: true, message: action.payload}
    case "CLEAR":
      return { visible: false, message: ""}
    default:
      return state
  }
}

const App = () => {
  const [notification, setNotification] = useReducer(notificationReducer, {visible: false, message: ""})
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    setNotification({ type: "SET", payload: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      setNotification({ type: "CLEAR" })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      <h3>Anecdote app</h3>
    
      <Notification message={notification.message}/>
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  )
}

export default App
