import { type TodoCompleted, type TodoId, type Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleteTodo: ({ id, completed }: { id: TodoId, completed: TodoCompleted }) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleteTodo }) => {
  return (
    <div className="view">
      <input
        className="toggle"
        checked={completed}
        type="checkbox"
        onChange={(event) => { onToggleCompleteTodo({ id: { id }, completed: { completed: event.target.checked } }) }}
      />
      <label>{title}</label>
      <button className="destroy" onClick={() => { onRemoveTodo({ id }) }} />
    </div>
  )
}
