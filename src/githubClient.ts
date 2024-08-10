import axios from 'axios';

import { GITHUB_API_URL } from './config/config';

export interface Repository {
    id: number;
    name: string;
    stars: number;
    forks: number;
    updated_at: string;
}

export async function fetchRepositories(
    query: string,
    language: string,
    created: string
): Promise<Repository[]> {
    try {
        const response = await axios.get(GITHUB_API_URL, {
            params: {
                q: `${query} language:${language} created:>${created}`,
                sort: 'stars',
                order: 'desc'
            },
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        return response.data.items.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            updated_at: repo.updated_at
        }));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Failed to fetch repositories: ${error.message}`);
        } else if (error instanceof Error) {
            throw new Error(`Unexpected error: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
