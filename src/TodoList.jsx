import { TodoItem } from "./TodoItem";

export function TodoList({todos, toggleTodo, deleteTodo}) {
    return (
        <ul className="list">
      {todos.length === 0 && "No Todos"}
        {todos.map((todo) => {
          return (
            // {...todo} is all the props of <TodoItem> in Spread syntax 
            // key is needed as todo  is rendered in an array and each element needs a unique id
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

// Anytime {} are used inside a return of HTML in React, it will be run as JS code. 
// ex: the return of todos.map being elements being returned one after another