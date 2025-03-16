"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// In-memory array for demonstration
let todos = [
    { id: '1', title: 'Sample To Do 1', completed: false },
    { id: '2', title: 'Sample To Do 2', completed: true }
];
const handler = async (event, context) => {
    const { httpMethod, pathParameters, body } = event;
    let statusCode = 200;
    let responseBody;
    try {
        switch (httpMethod) {
            case 'GET': {
                // GET /todos
                responseBody = todos;
                break;
            }
            case 'POST': {
                // POST /todos
                if (!body)
                    throw new Error('Missing request body');
                const newTodo = JSON.parse(body);
                const created = {
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
                if (!pathParameters?.id)
                    throw new Error('Missing todo ID in path');
                if (!body)
                    throw new Error('Missing request body');
                const todoUpdates = JSON.parse(body);
                const index = todos.findIndex((t) => t.id === pathParameters.id);
                if (index === -1)
                    throw new Error('Todo not found');
                todos[index] = { ...todos[index], ...todoUpdates };
                responseBody = todos[index];
                break;
            }
            case 'DELETE': {
                // DELETE /todos/{id}
                if (!pathParameters?.id)
                    throw new Error('Missing todo ID in path');
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
    }
    catch (error) {
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
exports.handler = handler;
