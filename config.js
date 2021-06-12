export const apiBaseURL = process.env.NODE_ENV === 'production'
    ? 'https://ad-my-brand-backend.cfdev.tech/find-trucks'
    : 'http://localhost:8080';