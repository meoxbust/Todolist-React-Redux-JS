import { ADD_LIST, ADD_TODO, DELETE_TODO, FINISH_TODO, GET_LIST, DELETE_LIST } from "../actions/constants";

const initialState = {
    listTodo: [],
};

const appReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_LIST: {
            return {
                ...state,
                listTodo: [action.payload, ...state.listTodo]
            };
        }
        case GET_LIST: {
            return {
                ...state,
                listTodo: action.payload
            }
        }
        case ADD_TODO: {
            return {
                ...state,
                listTodo: state.listTodo.map((list) => {
                    if(list.id === action.payload.id)
                        return {
                            ...list,
                            todos: [...list.todos, action.payload.todo],
                        };
                    return list;
                }),
            };
        }
        case FINISH_TODO: {
            return {
                ...state,
                listTodo: state.listTodo.map((item) => {
                    if(item.id === action.payload.idList)
                        return {
                            ...item,
                            todos: item.todos.map((todo) => {
                                if(todo.id === action.payload.idTodo){
                                    return {
                                        ...todo,
                                        completed: !todo.completed,
                                    };
                                }
                                return todo;
                            }),
                        };
                    return item;
                }),
            };
        }
        case DELETE_TODO: {
            return {
                ...state,
                listTodo: state.listTodo.map((item) => {
                    if(item.id === action.payload.idList)
                        return {
                            ...item,
                            todos: item.todos.filter((todo) => todo.id !== action.payload.idTodo),
                        };
                    return item;
                }),
            };
        }
        case DELETE_LIST: {
            return {
                ...state,
                listTodo: state.listTodo.filter((item) => item.id !== action.payload.idList)
            }
        }
        default: {
            return state;
        }
    }
};

export default appReducer;