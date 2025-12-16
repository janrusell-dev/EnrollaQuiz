## About The Project

This project is a full-stack quiz application built as part of the Enrolla Full-Stack Developer coding assessment.

## Built With

This project was built using the following technologies:

### Frontend

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Tailwind][TailwindCSS]][Tailwind-url]

### Backend

- [![Node][Node.js]][Node-url]
- [![Hono][Hono.js]][Hono-url]
- [![Vitest][Vitest.js]][Vitest-url]

### Tooling & Deployment

- [![TypeScript][TypeScript]][TypeScript-url]
- [![Vercel][Vercel]][Vercel-url]
- [![Cloudflare][Cloudflare]][Cloudflare-url]

## Getting Started

### Prerequisites

- Node.js v25
- npm, pnpm, yarn, or bun

### Installation

Clone the repository:

```bash
git clone https://github.com/janrusell-dev/EnrollaQuiz.git
cd EnrollaQuiz
```

### Backend (Hono – Cloudflare Worker)

```bash
cd backend
npm install
npm run dev
```

The API will be available at http://localhost:8787

### Testing Backend

```bash
npm run test
```

Expected: all tests pass (22 total)

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

The app will be available at http://localhost:3000.

### Production Build

```bash
npm run build
```

### Backend Deployment with Cloudflare Worker

```bash
cd backend
npm run deploy
```

## Architecture Notes

### Backend: Edge (Cloudflare Workers)

I deployed the backend using Cloudflare Workers, which runs on the Edge instead of a traditional Node.js server. I chose this because:

- It works well with Hono.
- It provides fast global response times.
- It matches the challenge requirement for Worker deployment.

The API is fully stateless and uses only mock data.

### Frontend: Next.js App Router

I used the Next.js App Router instead of the Pages Router because:

- It provides better layout handling.
- It is the current recommended approach in modern Next.js.
- It works well with server components and client components separation.

All quiz rendering and submission logic happens on the client side.

## Validation Approach

### Backend Validation

- `/api/quiz` ensures that every question contains the required fields such as `id`, `type`, and `question`.
- `/api/grade` validates that:
  - The request body contains an `answers` array.
  - Each item in the array contains both `id` and `value`.
- `index.test.ts` verifies the health check endpoint of the backend:
  - Confirms that a GET request to `/` returns a `200` status with the expected `status` and `message` fields.
  - Ensures that the response contains information about available endpoints (`quiz` and `grade`), confirming the API is running correctly.
- If validation fails, the API returns a `400` status with an error message.

### Frontend Validation

- The user is prevented from submitting empty answers.
- Inputs are controlled using React state.
- API errors and network failures display a user-friendly error message.

## Libraries Used and Rationale

- **Next.js** – Used for the frontend because it provides built-in routing, easy deployment to Vercel, and good performance.
- **React** – Used for managing UI state and form handling.
- **TailwindCSS** – Used for fast and consistent UI styling without writing custom CSS.
- **Hono** – Used for the backend because it is lightweight, fast, and designed for Edge environments.
- **Cloudflare Workers** – Used for deploying the backend API globally with low latency.
- **Vitest** – Used for testing the grading, quiz, and validation logic to ensure correctness of backend functions. I chose Vitest because, according to the Hono documentation, it is the recommended testing framework and integrates well with TypeScript projects.

## Trade-offs and Shortcuts

- I used static mock data instead of dynamic generation to strictly follow the no-database rule.
- The UI design was kept minimal to focus on correct functionality, validation, and grading logic.
- I did not add authentication since it was outside the scope of the challenge.
- Error messages are basic and could be improved with more detailed user feedback in a production system.

## Honest Time Spent

- Planning & API design: 2 hours
- Backend unit testing: 3 hours
- Reading Hono documentation and Backend implementation: 6 hours
- Frontend implementation: 5 hours
- Testing & deployment: 2 hours
- README & Loom video: 2 hours

**Total: 20 hours**

<!-- MARKDOWN LINKS & IMAGES -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCSS]: https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[Hono.js]: https://img.shields.io/badge/Hono-FF5A1F?style=for-the-badge&logo=cloudflare&logoColor=white
[Hono-url]: https://hono.dev/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[Cloudflare]: https://img.shields.io/badge/Cloudflare%20Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white
[Cloudflare-url]: https://workers.cloudflare.com/
[Vitest.js]: https://img.shields.io/badge/Vitest-646cff?style=for-the-badge&logo=vitest&logoColor=white
[Vitest-url]: https://vitest.dev/
