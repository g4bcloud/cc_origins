import request from 'supertest';
import app from '../server.js';

describe('API Tests', () => {
    test('GET /users should return 200', async () => {
        const response = await request(app)
            .get('/users?userId=123')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('userId', '123');
    });

    test('POST /users should return 201', async () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com'
        };

        const response = await request(app)
            .post('/users')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toHaveProperty('message', 'User created successfully');
    });
});
