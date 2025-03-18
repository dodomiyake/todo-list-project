import { APIGatewayEvent, Context } from 'aws-lambda';

/**
 * Interface defining the structure of a Todo item
 */
interface Todo {
    id: string;          // Unique identifier for the todo
    title: string;       // Title/description of the todo
    completed: boolean;  // Completion status of the todo
}

// In-memory array to store todo items (Note: this will reset when the Lambda function cold starts)
let todos: Todo[] = [];

/**
 * Lambda function handler for a serverless Todo API
 * Implements basic CRUD operations for a todo list with TypeScript type safety
 * 
 * @param {APIGatewayEvent} event - AWS Lambda event object containing HTTP request details
 * @param {Context} context - AWS Lambda context object
 * @returns {Object} HTTP response object with statusCode, headers and body
 */
export const handler = async (event: APIGatewayEvent, context: Context) => {
    const { httpMethod, pathParameters, body } = event;

    let statusCode = 200;
    let responseBody: any;

    try {
        switch (httpMethod) {
            case 'GET': {
                // GET /todos - Retrieve all todos
                responseBody = todos;
                break;
            }
            case 'POST': {
                // POST /todos - Create a new todo
                if (!body) throw new Error('Missing request body');
                const newTodo = JSON.parse(body) as Partial<Todo>;
                const created: Todo = {
                    id: (todos.length + 1).toString(), // Simple ID generation
                    title: newTodo.title || 'Untitled', // Default title if none provided
                    completed: newTodo.completed || false // Default to incomplete
                };
                todos.push(created);
                statusCode = 201; // Created status code
                responseBody = created;
                break;
            }
            case 'PUT': {
                // PUT /todos/{id} - Update an existing todo
                if (!pathParameters?.id) throw new Error('Missing todo ID in path');
                if (!body) throw new Error('Missing request body');
                const todoUpdates = JSON.parse(body) as Partial<Todo>;
                const index = todos.findIndex((t) => t.id === pathParameters.id);
                if (index === -1) throw new Error('Todo not found');

                todos[index] = { ...todos[index], ...todoUpdates }; // Merge existing todo with updates
                responseBody = todos[index];
                break;
            }
            case 'DELETE': {
                // DELETE /todos/{id} - Remove a todo
                if (!pathParameters?.id) throw new Error('Missing todo ID in path');
                todos = todos.filter((t) => t.id !== pathParameters.id); // Filter out the todo with matching ID
                responseBody = { message: 'Todo deleted' };
                break;
            }
            default: {
                // Handle unsupported HTTP methods
                statusCode = 405; // Method Not Allowed status code
                responseBody = { message: 'Method not allowed' };
                break;
            }
        }
    } catch (error: any) {
        // Error handling for all operations
        statusCode = 400; // Bad Request status code
        responseBody = { error: error.message };
    }

    return {
        statusCode,
        body: JSON.stringify(responseBody), // Convert response to JSON string
        headers: {
            'Content-Type': 'application/json' // Set appropriate content type header
        }
    };
};