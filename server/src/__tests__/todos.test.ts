import { APIGatewayEvent, Context } from 'aws-lambda';
import { handler } from '../handlers/todos';

describe('Basic Jest Setup', () => {
    it('should pass this sample test', () => {
        expect(1 + 1).toBe(2);
    });
});

describe('todos handler', () => {
    it('should return a list of todos on GET', async () => {
        const event = { httpMethod: 'GET' } as APIGatewayEvent;
        const context = {} as Context;

        const result = await handler(event, context);
        expect(result.statusCode).toBe(200);

        const body = JSON.parse(result.body);
        expect(Array.isArray(body)).toBe(true);
    });
});