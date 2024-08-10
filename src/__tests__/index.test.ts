import request from 'supertest';
import express from 'express';

const app = express();

app.get('/health', (req, res) => res.status(200).send('OK'));

describe('GET /health', () => {
  it('should respond with OK', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });
});
