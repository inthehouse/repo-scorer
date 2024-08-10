import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchRepositories } from '../githubClient';

import { GITHUB_API_URL } from '../config/config';

const mock = new MockAdapter(axios);

describe('fetchRepositories', () => {
    beforeEach(() => {
        mock.reset();
    });

    it('should fetch and return repositories correctly', async () => {
        mock.onGet(GITHUB_API_URL, {
            params: {
                q: 'test language:typescript created:>2024-01-01',
                sort: 'stars',
                order: 'desc'
            }
        }).reply(200, {
            items: [
                {
                    id: 123456,
                    name: 'DummyRepo',
                    stargazers_count: 123,
                    forks_count: 45,
                    updated_at: '2024-08-01T00:00:00Z'
                }
            ]
        });

        const repositories = await fetchRepositories('test', 'typescript', '2024-01-01');
        expect(repositories).toHaveLength(1);
        expect(repositories[0]).toEqual({
            id: 123456,
            name: 'DummyRepo',
            stars: 123,
            forks: 45,
            updated_at: '2024-08-01T00:00:00Z'
        });
    });

    it('should handle errors gracefully', async () => {
        mock.onGet(GITHUB_API_URL, {
            params: {
                q: 'test language:typescript created:>2024-01-01',
                sort: 'stars',
                order: 'desc'
            }
        }).reply(500);

        try {
            await fetchRepositories('test', 'typescript', '2024-01-01');
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toMatch(/Failed to fetch repositories/);
            } else {
                throw new Error('Unexpected error type');
            }
        }
    });
});
