import { generateId } from "../helpers";export interface ITodoAppReducer { // создаем интерфейс, который будет предоставлять схему нашей задачи    id: string;    title: string;    isComplete: boolean}interface AddTodoAction { // интерфейс для добавления нашей задачи    type: "ADD_TODO"    payload: { title: string }}interface RemoveTodoAction { // интерфейс для удаления и изменения нашей задачи    type: "REMOVE_TODO" | "TOGGLE_TODO"    payload: { id: string }}interface EditTodoAction { // интерфейс для редактирования нашей задачи    type: "EDIT_TODO"    payload: { id: string, title: string }}export type TodoAction = AddTodoAction | RemoveTodoAction | EditTodoAction // создаем actionexport const TodoAppReducer = (todos: Array<ITodoAppReducer>, action: TodoAction) => { // создаем функцию редуктора для управления состоянием    const newTodo = (title: string): ITodoAppReducer => { // функция для создания нашей задачи        return { id: generateId(), title: title, isComplete: false };    }    switch (action.type) {        case "ADD_TODO":        {            return [...todos, newTodo(action.payload.title)] // копируем наш todos и добавляем задачу        }        case "REMOVE_TODO":        {            // применяем на наш список дел фильтр и сравниваем id списка дел с id полученным извне            // Если id не является равным полученному id, то добавляем, если является, удаляем            return todos.filter((todo) => todo.id !== action.payload.id)        }        case "EDIT_TODO":        {            const todoIndex = todos.findIndex(todo => todo.id === action.payload.id) // возвращаем индекс в массиве, если id удовлетворяет условию            const todoItems = todos[todoIndex] // индекс нашей задачи            todoItems.title = action.payload.title // изменение тайтла нашей задачи            const todo = todos // делаем копию нашего массива            todo.splice(todoIndex, 1, todoItems) // изменяем содержимое массива            return [...todos] // возвращаем наш массив        }        case "TOGGLE_TODO":        {            return todos.map((todo) => {                if (todo.id !== action.payload.id) return todo // если для каждого списка дел id не равна, то возвращаем todo                return { ...todo, isComplete: !todo.isComplete } // копирует наше todo и изменяем поле isComplete с инверсией значения            })        }        default:            return todos    }}