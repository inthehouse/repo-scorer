import express, { Request, Response } from 'express';

import { fetchRepositories } from './githubClient';
import { calculateScore } from './scoreCalculator';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('OK');
});

app.get('/repositories', async (req: Request, res: Response) => {
    const { query, language, created } = req.query;

    if (!query || !language || !created) {
        return res.status(400).json({ error: 'Missing query parameters' });
    }

    try {
        const repositories = await fetchRepositories(query as string, language as string, created as string);
        const scoredRepositories = repositories.map(repo => ({
            ...repo,
            score: calculateScore(repo)
        }));
        res.json(scoredRepositories);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
