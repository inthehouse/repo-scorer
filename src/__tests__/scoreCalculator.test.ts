import { calculateScore } from '../scoreCalculator';

describe('calculateScore', () => {
  it('should calculate the score correctly based on stars, forks, and recency', () => {
    const repo = {
      id: 1,
      name: 'Repo1',
      stars: 100,
      forks: 50,
      updated_at: new Date().toISOString()
    };

    const score = calculateScore(repo);
    expect(score).toBeGreaterThan(0);
  });

  it('should give a higher score for more recent updates', () => {
    const recentRepo = {
      id: 1,
      name: 'Repo1',
      stars: 100,
      forks: 50,
      updated_at: new Date().toISOString()
    };

    const olderRepo = {
      id: 2,
      name: 'Repo2',
      stars: 100,
      forks: 50,
      updated_at: new Date('2023-01-01').toISOString()
    };

    expect(calculateScore(recentRepo)).toBeGreaterThan(calculateScore(olderRepo));
  });
});
