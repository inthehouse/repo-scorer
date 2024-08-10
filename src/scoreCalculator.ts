import { Repository } from './githubClient';

export function calculateScore(repo: Repository): number {
  const { stars, forks, updated_at } = repo;
  const recencyFactor = calculateRecencyFactor(updated_at);

  return stars * 0.5 + forks * 0.3 + recencyFactor * 0.2;
}

function calculateRecencyFactor(updatedAt: string): number {
  const lastUpdated = new Date(updatedAt);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 3600 * 24));

  return Math.max(0, 30 - diffInDays) / 30;
}
