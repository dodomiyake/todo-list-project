// Import necessary modules from Redux Toolkit and axios
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the structure of a Todo item
export interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

// Define the shape of our slice's state, including an array of todos,
// a status for async operations, and a possible error message
interface TodosState {
    data: Todo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Initialize the default state for our todos slice
const initialState: TodosState = {
    data: [],
    status: 'idle',
    error: null
};

// URL for making API requests. Replace with your own server or endpoint as needed.
const API_BASE_URL = 'http://localhost:3000';

// Thunk for fetching the list of todos from the API
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    // Sends a GET request to fetch all todos
    const response = await axios.get(`${API_BASE_URL}/todos`);
    // Return the data from the response, which will be handled by Redux
    return response.data;
});

// Thunk for adding a new todo to the API
export const addTodo = createAsyncThunk('todos/addTodo', async (title: string) => {
    // Sends a POST request to create a new todo
    const response = await axios.post(`${API_BASE_URL}/todos`, { title });
    // Return the newly created todo
    return response.data;
});

// Thunk for updating an existing todo
export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async ({ id, updates }: { id: string; updates: Partial<Todo> }) => {
        // Sends a PUT request to update a specific todo by its ID
        const response = await axios.put(`${API_BASE_URL}/todos/${id}`, updates);
        // Return the updated todo
        return response.data;
    }
);

// Thunk for deleting a todo by its ID
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
    // Sends a DELETE request for a specific todo
    await axios.delete(`${API_BASE_URL}/todos/${id}`);
    // Return the ID of the deleted todo so we can remove it from our state
    return id;
});

// Create a slice that handles todo-related actions and state updates
const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // Handle different states of our async operations
        builder
            // When fetching todos is pending, set status to 'loading'
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            // When fetching todos is successful, store the data and set status to 'succeeded'
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            // When fetching todos fails, set status to 'failed' and store the error message
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            // When adding a todo succeeds, push the new todo into our data array
            .addCase(addTodo.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            // When updating a todo succeeds, find the existing todo by ID and update it
            .addCase(updateTodo.fulfilled, (state, action) => {
                const idx = state.data.findIndex((t) => t.id === action.payload.id);
                if (idx !== -1) {
                    state.data[idx] = action.payload;
                }
            })
            // When deleting a todo succeeds, remove the todo from our data array by its ID
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.data = state.data.filter((t) => t.id !== action.payload);
            });
    }
});

// Export the todos reducer to be used in the store
export default todosSlice.reducer;
