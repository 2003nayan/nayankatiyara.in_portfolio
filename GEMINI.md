# Gemini Project Configuration

This file provides context and instructions for the Gemini AI agent to effectively assist with the development of this project.

## Project Overview

This is a personal portfolio website for Nayan Katiyara. It is built using modern web technologies to showcase projects, skills, experience, and certifications.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (using the App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Project Structure

- `app/`: Contains the core application logic, pages, and API routes (following the Next.js App Router structure).
- `components/`: Contains reusable React components used throughout the application.
  - `components/ui/`: Specific UI components from shadcn/ui.
- `data/`: Holds static data, such as the main `portfolio-data.json` file.
- `hooks/`: Custom React hooks for shared logic.
- `lib/`: Utility functions, data fetching logic, and other shared library code.
- `public/`: Static assets like images and fonts.
- `styles/`: Global styles.

## Development Workflow

- **Install Dependencies**: `pnpm install`
- **Run Development Server**: `pnpm dev`
- **Create a Production Build**: `pnpm build`
- **Run Linter**: `pnpm lint`

## Key Conventions

- **Data Management**: All portfolio content (projects, experience, skills, etc.) is managed in the `data/portfolio-data.json` file. To update portfolio content, you should modify this JSON file.
- **Component-Based Architecture**: The UI is built with reusable React components. When adding new UI elements, please follow the existing component structure and styling conventions.
- **Styling**: Use Tailwind CSS utility classes for styling. Avoid writing custom CSS unless absolutely necessary.
- **Changelog**: Whenever you make changes to the codebase, you must update the `Changes.md` file with detailed information about the changes.
