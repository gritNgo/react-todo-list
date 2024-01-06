import { TodoItem } from "./TodoItem";

export function TodoList({todos, toggleTodo, deleteTodo}) {
    return (
        <ul className="list">
      {todos.length === 0 && "No Todos"}
        {todos.map((todo) => {
          return (
            // {...todo} is all the props of <TodoItem> in Spread syntax 
            // key needed as todo  is rendered in an array
            <TodoItem 
            {...todo} 
            key={todo.id} 
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            />
          );
        })}
      </ul> 
    )
}