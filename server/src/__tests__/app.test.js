import request from 'supertest';
import app from '../../app.js';

// ── Sanity check ──────────────────────────────────────────────────────────────
describe('Server — sanity check', () => {
  it('GET /api/health should return 200 with success flag', async () => {
    const res = await request(app).get('/api/health');

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ success: true });
  });
});
