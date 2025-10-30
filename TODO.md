# TODO: Implement Registration Page with Simple REST API Simulation

- [x] Create register.html: New registration page with form for username, password, confirm password, styled like login.html, with link back to login.
- [x] Create register.js: Handle registration form submission, validate inputs, simulate POST API by storing user in localStorage, redirect to login on success.
- [x] Edit login.html: Add link to register.html ("Don't have an account? Register here").
- [x] Edit login.js: Update login logic to check against registered users in localStorage; if no users, fall back to hardcoded creds or show message.

# TODO: Set up CI and Docker for JWT Playground Webapp

- [x] Create Dockerfile: Use nginx:alpine as base image, copy all static files to /usr/share/nginx/html.
- [x] Create .github/workflows/ci.yml: Set up GitHub Actions workflow to build Docker image on push to main branch, login to Docker Hub, and push as chodajmi/jwt-playground:latest.
- [x] Test Docker image locally: Build and run the image, access via browser to verify static files are served correctly.
- [ ] Set up GitHub secrets: Ensure DOCKER_USERNAME and DOCKER_PASSWORD are configured in repo secrets for Docker Hub access.
- [x] Verify CI workflow: Push changes to main branch and confirm the workflow builds and pushes the image successfully.
