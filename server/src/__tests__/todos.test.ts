// Import types from AWS Lambda for type checking
import { APIGatewayEvent, Context } from 'aws-lambda';
// Import the handler function to test
import { handler } from '../handlers/todos';

/**
 * Basic sanity test to ensure Jest is set up correctly
 */
describe('Basic Jest Setup', () => {
    it('should pass this sample test', () => {
        // Simple assertion to confirm testing environment works
        expect(1 + 1).toBe(2);
    });
});

/**
 * Test suite for the todos API handler
 */
describe('todos handler', () => {
    /**
     * Test case for GET request to fetch all todos
     * Verifies that the endpoint returns:
     * 1. A 200 status code
     * 2. An array of todos (even if empty)
     */
    it('should return a list of todos on GET', async () => {
        // Mock the APIGatewayEvent with minimal required properties
        const event = { httpMethod: 'GET' } as APIGatewayEvent;
        // Empty context object (not used in handler logic)
        const context = {} as Context;

        // Call the handler with mocked event and context
        const result = await handler(event, context);
        // Verify 200 (OK) status code
        expect(result.statusCode).toBe(200);

        // Parse response body from JSON string to JavaScript object
        const body = JSON.parse(result.body);
        // Verify the response is an array (todos list)
        expect(Array.isArray(body)).toBe(true);
    });
});