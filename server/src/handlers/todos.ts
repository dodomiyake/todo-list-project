import { APIGatewayEvent, Context } from 'aws-lambda';

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

// In-memory array for demonstration
let todos: Todo[] = [];

export const handler = async (event: APIGatewayEvent, context: Context) => {
    const { httpMethod, pathParameters, body } = event;

    let statusCode = 200;
    let responseBody: any;

    try {
        switch (httpMethod) {
            case 'GET': {
                // GET /todos
                responseBody = todos;
                break;
            }
            case 'POST': {
                // POST /todos
                if (!body) throw new Error('Missing request body');
                const newTodo = JSON.parse(body) as Partial<Todo>;
                const created: Todo = {
                    id: (todos.length + 1).toString(),
                    title: newTodo.title || 'Untitled',
                    completed: newTodo.completed || false
                };
                todos.push(created);
                statusCode = 201;
                responseBody = created;
                break;
            }
            case 'PUT': {
                // PUT /todos/{id}
                if (!pathParameters?.id) throw new Error('Missing todo ID in path');
                if (!body) throw new Error('Missing request body');
                const todoUpdates = JSON.parse(body) as Partial<Todo>;
                const index = todos.findIndex((t) => t.id === pathParameters.id);
                if (index === -1) throw new Error('Todo not found');

                todos[index] = { ...todos[index], ...todoUpdates };
                responseBody = todos[index];
                break;
            }
            case 'DELETE': {
                // DELETE /todos/{id}
                if (!pathParameters?.id) throw new Error('Missing todo ID in path');
                todos = todos.filter((t) => t.id !== pathParameters.id);
                responseBody = { message: 'Todo deleted' };
                break;
            }
            default: {
                statusCode = 405;
                responseBody = { message: 'Method not allowed' };
                break;
            }
        }
    } catch (error: any) {
        statusCode = 400;
        responseBody = { error: error.message };
    }

    return {
        statusCode,
        body: JSON.stringify(responseBody),
        headers: {
            'Content-Type': 'application/json'
        }
    };
};
