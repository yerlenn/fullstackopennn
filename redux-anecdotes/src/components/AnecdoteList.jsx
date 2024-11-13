import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
      return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })
    console.log(anecdotes)
    const orderedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const handleVote = (id, content) => {
      dispatch(voteAnecdote(id))
      dispatch(setNotification(`you voted '${content}'`, 5))
    }

    return (
        <div>
          {orderedAnecdotes.map(anecdote =>
              <div key={anecdote.id}>
              <div>
                  {anecdote.content}
              </div>
              <div>
                  has {anecdote.votes}
                  <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
              </div>
              </div>
          )}
        </div>
    )
}

export default AnecdoteList