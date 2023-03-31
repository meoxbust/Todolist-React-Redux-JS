import { ADD_LIST, ADD_TODO, DELETE_TODO, FINISH_TODO, GET_LIST, DELETE_LIST } from "./constants";

export const addList = (payload) => {
    return {
        type: ADD_LIST,
        payload,
    };
};

export const getList = (list) => {
    return {
        type: GET_LIST,
        payload: list,
    };
};

export const deleteList = (idList) => {
    return {
        type: DELETE_LIST,
        payload: {
            idList
        },
    };
};

export const addTodo = (payload) => {
    return {
        type: ADD_TODO,
        payload,
    };
};

export const finishTodo = (idList, idTodo) => {
    return{
        type: FINISH_TODO,
        payload: {
            idList,
            idTodo,
        },
    };
};

export const deleteTodo = (idList, idTodo) => {
    return{
        type: DELETE_TODO,
        payload: {
            idList,
            idTodo,
        },
    };
};