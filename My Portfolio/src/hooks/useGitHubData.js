import { useState, useEffect } from 'react';

const FALLBACK_USER = {
  login: 'megatheshwaran',
  name: 'Megatheshwaran R',
  public_repos: 12,
  followers: 8,
  following: 14,
  avatar_url: './boy.png',
  bio: 'Java Full Stack Developer | Enterprise Backend, Spring Boot & Distributed Systems',
  html_url: 'https://github.com/megatheshwaran',
};

const FALLBACK_REPOS = [
  {
    id: 1,
    name: 'customer-management-system',
    description: 'Enterprise Customer Information Management web application built with JSP, Java Servlets, and JDBC.',
    html_url: 'https://github.com/megatheshwaran',
    language: 'Java',
    stargazers_count: 5,
    forks_count: 2,
    updated_at: '2025-11-20T10:00:00Z',
    topics: ['java', 'jsp', 'jdbc', 'mysql', 'servlets']
  },
  {
    id: 2,
    name: 'library-management-system',
    description: 'High-performance Core Java and JDBC circulation engine with automated overdue penalty calculations.',
    html_url: 'https://github.com/megatheshwaran',
    language: 'Java',
    stargazers_count: 4,
    forks_count: 1,
    updated_at: '2025-10-15T10:00:00Z',
    topics: ['core-java', 'jdbc', 'mysql', 'oop']
  },
  {
    id: 3,
    name: 'iot-telecom-energy-management',
    description: 'IoT telemetry & MQTT-based automated power management system for remote telecom rooms (IJNIET publication).',
    html_url: 'https://github.com/megatheshwaran',
    language: 'Java',
    stargazers_count: 7,
    forks_count: 3,
    updated_at: '2025-08-12T10:00:00Z',
    topics: ['iot', 'mqtt', 'blynk', 'sensors']
  },
  {
    id: 4,
    name: 'spring-boot-ecommerce-api',
    description: 'Modular Spring Boot REST API engine with stateless JWT security and Spring Data JPA persistence.',
    html_url: 'https://github.com/megatheshwaran',
    language: 'Java',
    stargazers_count: 6,
    forks_count: 2,
    updated_at: '2026-01-10T10:00:00Z',
    topics: ['spring-boot', 'rest-api', 'jwt', 'hibernate']
  },
  {
    id: 5,
    name: 'smart-garbage-monitoring',
    description: 'Municipal cleanliness telemetry system using ultrasonic depth sensors and automated REST webhooks.',
    html_url: 'https://github.com/megatheshwaran',
    language: 'JavaScript',
    stargazers_count: 3,
    forks_count: 1,
    updated_at: '2024-12-05T10:00:00Z',
    topics: ['iot', 'sensors', 'automation']
  },
  {
    id: 6,
    name: 'license-plate-recognition',
    description: 'MATLAB computer vision pipeline with adaptive morphological ROI extraction and alphanumeric segmentation.',
    html_url: 'https://github.com/megatheshwaran',
    language: 'MATLAB',
    stargazers_count: 5,
    forks_count: 2,
    updated_at: '2024-09-18T10:00:00Z',
    topics: ['computer-vision', 'matlab', 'image-processing']
  }
];

export function useGitHubData(username = 'megatheshwaran') {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHub() {
      setLoading(true);
      setError(null);

      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) {
          throw new Error(`GitHub user request failed: ${userRes.status}`);
        }
        const userJson = await userRes.json();

        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        let reposJson = [];
        if (reposRes.ok) {
          reposJson = await reposRes.json();
        }

        if (isMounted) {
          setUserData(userJson);
          setRepos(reposJson.length > 0 ? reposJson : FALLBACK_REPOS);
          setIsUsingFallback(false);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('Using curated GitHub fallback data:', err.message);
          setUserData(FALLBACK_USER);
          setRepos(FALLBACK_REPOS);
          setIsUsingFallback(true);
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchGitHub();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { userData, repos, loading, error, isUsingFallback };
}
