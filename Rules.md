# RULES.md

## Project Goal

Build production-quality software with clean architecture, modular design, and maintainable code.

---

## General Rules

- Always write clean, readable code.
- Never generate placeholder or broken code.
- Never remove existing working code unless instructed.
- Explain major changes before applying them.
- Keep files modular and reusable.
- Follow SOLID principles whenever applicable.
- Avoid duplicate code.
- Prefer composition over repetition.

---

## Code Style

- Use meaningful variable names.
- Keep functions short and focused.
- Add comments only where logic is non-obvious.
- Handle errors gracefully.
- Never hardcode secrets or API keys.
- Store configuration in `.env`.

---

## Frontend Rules

- React + TypeScript
- Tailwind CSS
- Responsive on mobile, tablet, and desktop
- Reusable components
- Consistent spacing and typography
- Loading indicators for async actions
- Proper error states
- Accessible UI (ARIA where appropriate)

---

## Backend Rules

- FastAPI
- RESTful API design
- Modular routes
- Separate services from controllers
- Validate request data
- Proper HTTP status codes
- Centralized exception handling

---

## AI Rules

- Use Gemini API only through backend.
- Never expose API keys.
- Validate prompts before sending.
- Handle API failures gracefully.
- Return structured JSON responses whenever possible.

---

## Security Rules

- Validate all user input.
- Sanitize request data.
- Do not expose sensitive information.
- Use environment variables for secrets.
- Protect API endpoints when authentication is added.

---

## UI/UX Rules

- Modern professional interface
- Minimalist design
- Consistent color palette
- Smooth animations
- Dark mode support
- Fast loading experience

---

## Development Workflow

1. Plan feature.
2. Generate code.
3. Review code.
4. Fix issues.
5. Test feature.
6. Commit changes.

Never generate multiple unrelated features in one step.

---

## Documentation

Every new feature should include:
- Purpose
- File structure
- Setup instructions
- API documentation (if applicable)

---

## Git Rules

Commit after every completed feature.

Commit format:

feat: add AI chatbot

fix: resolve API error

refactor: improve dashboard layout

docs: update README

---

## Performance

- Lazy load components where appropriate.
- Minimize API calls.
- Optimize images.
- Keep bundle size small.

---

## Final Goal

Produce clean, maintainable, scalable software that can be deployed without major refactoring.