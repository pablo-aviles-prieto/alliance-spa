
# Alliance SPA

A modern Single Page Application (SPA) built using cutting-edge technologies to deliver a fast, efficient, and scalable user experience.  

## **Technologies Used**
- **Framework**: [Vite](https://vitejs.dev/) for lightning-fast development.
- **Language**: TypeScript for static typing.
- **React**: Frontend library for building user interfaces.
- **GraphQL**: For efficient API interactions.
- **TailwindCSS**: For styling.
- **Playwright**: End-to-end testing framework.
- **Vitest**: Unit testing framework.
- **ESLint & Prettier**: For code quality and formatting.
- **Husky**: Git hooks to enforce consistent standards.

---

## **Installation**
1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd alliance-spa
2. **Install Dependencies**: Ensure you have **pnpm** installed. Then run::
   ```bash
   pnpm install   
## **Scripts**

| Script                | Description                                      |
|-----------------------|--------------------------------------------------|
| `pnpm dev`            | Start the development server.                   |
| `pnpm codegen:watch`  | Watch GraphQL schema changes and generate code. |
| `pnpm dev:codegen`    | Run the dev server and GraphQL codegen together.|
| `pnpm build`          | Build the app for production.                   |
| `pnpm preview`        | Preview the production build.                   |
| `pnpm lint`           | Run ESLint on the codebase.                     |
| `pnpm test:unit`      | Run unit tests using Vitest.                    |
| `pnpm coverage`       | Generate unit test coverage.                    |
| `pnpm test:e2e`       | Run end-to-end tests with Playwright.           |
| `pnpm test:e2e:report`| View Playwright test reports.                   |
| `pnpm test:e2e:debug` | Debug end-to-end tests.                         |
| `pnpm test:all`       | Run all tests (unit and end-to-end).            |


## **Development**

1.  **Start the Development Server**:
    
      ```bash
    pnpm dev 
2.  **Run the Dev Server with GraphQL Codegen**:
    
      ```bash
	pnpm dev:codegen
3.  **Lint and Format**:
    
      ```bash
	pnpm lint


## **Build for Production**

To create a production-ready build:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## **Testing**

1.  **Unit Tests**:
    
	```bash
	pnpm test:unit
	```
    
    
    
2.  **End-to-End Tests**:
    
    ```bash
	pnpm test:e2e
	``` 
    
    View the test report:
    
    ```bash
	pnpm test:e2e:report
	``` 
    
    Debug end-to-end tests:
    
    ```bash
	pnpm test:e2e:debug
	``` 
    
3.  **Run All Tests**:
    
    ```bash
	pnpm test:all
	``` 

---

*Pablo Avilés Prieto*