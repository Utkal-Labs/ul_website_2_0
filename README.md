# Git Branching and Workflow Guide

This document provides guidelines on how to manage Git branches effectively, naming conventions, and the usage of different branches (`main`, `develop`, `release`). It also covers how to work with branches, fetch changes from `origin`, and raise Pull Requests (PR).

---

## Branch Naming Conventions

### Main Branches:
- **main**: This is the production-ready branch. Code here is always stable and fully tested.
- **develop**: This is the default branch where all features and bug fixes are integrated. It's the active development branch.

### Supporting Branches:
These branches help organize the development and release workflow.

1. **feature/[feature-name]**:
   - Used for new features.
   - Created from `develop`.
   - Merged back into `develop` once completed and reviewed.
   
   Example: `feature/add-user-authentication`

2. **bugfix/[issue-name]**:
   - Used for bug fixes.
   - Created from `develop` (or `release` if the bug needs to be fixed in the release branch).
   - Merged back into `develop` (or `release`).

   Example: `bugfix/fix-login-issue`

3. **hotfix/[issue-name]**:
   - Used for critical production bugs.
   - Created from `main`.
   - Merged back into `main` and `develop` (if applicable).

   Example: `hotfix/urgent-login-fix`

4. **release/[version-number]**:
   - Used to prepare for a new production release.
   - Created from `develop` when preparing for a new release.
   - Merged into `main` and `develop` after the release.

   Example: `release/1.0.0`

---

## Branch Workflow

### 1. *main Branch*
   - The `main` branch always contains the latest production code.
   - No direct commits to `main` are allowed. Changes are merged into `main` from `release` or `hotfix` branches.

### 2. *develop Branch*
   - All feature branches and bugfix branches are merged into `develop`.
   - `develop` should always be in a stable state. While not production-ready, it should pass tests before merging.

### 3. *Feature Branches*
   - All new features are developed in branches named `feature/[feature-name]`.
   - Feature branches are created from `develop` and, once completed, merged back into `develop` via a PR.
   - Example flow:
     bash
     git checkout develop
     git pull origin develop
     git checkout -b feature/add-new-api
     

### 4. *Release Branches*
   - Created when a new version is ready to be released. The naming convention is `release/[version-number]`.
   - Bug fixes that must be included in the release can be merged into this branch.
   - Once the release is finalized, it is merged into both `main` and `develop`.
   - Example flow:
     bash
     git checkout develop
     git pull origin develop
     git checkout -b release/1.1.0
     

### 5. *Bugfix Branches*
   - For non-critical bugs, the branch is created from `develop` and merged back into `develop`.
   - For bugs found during a release process, it can be created from `release` and merged into both `release` and `develop`.
   - Example flow:
     bash
     git checkout develop
     git pull origin develop
     git checkout -b bugfix/fix-registration-form
     

### 6. *Hotfix Branches*
   - Hotfixes are for urgent fixes in production.
   - They are branched from `main` and merged into both `main` and `develop` to make sure the changes are reflected in both.
   - Example flow:
     bash
     git checkout main
     git pull origin main
     git checkout -b hotfix/fix-critical-error
     

---

## How to Manage Branches

### 1. *Creating a Branch from develop*
   - Always ensure your `develop` branch is up to date before creating a new branch:
     bash
     git checkout develop
     git pull origin develop
     git checkout -b feature/[feature-name]
     

### 2. *Occasionally Pull Changes from origin*
   - While working on your branch, regularly pull changes from `develop` to ensure you are working with the latest code:
     bash
     git checkout develop
     git pull origin develop
     git checkout feature/[feature-name]
     git merge develop
     

### 3. *Raising a Pull Request (PR)*
   - Once your feature or bugfix is ready, push your branch to `origin` and create a Pull Request (PR) against `develop`.
     bash
     git add .
     git commit -m "Implemented [feature-name]"
     git push origin feature/[feature-name]
     
   - After pushing the branch, navigate to GitHub and create a Pull Request:
     1. Go to your repository on GitHub.
     2. Click the "Compare & pull request" button.
     3. Select `develop` as the base branch.
     4. Add reviewers and wait for approvals.
   
### 4. *Review and Merge*
   - After your PR is approved and checks have passed, it is merged it into `develop`.

---

## Final Notes

- **Regular Sync**: It is a good practice to regularly merge the latest changes from `develop` into your working branch to avoid large conflicts.
  
- **Branch Protection**: You can enable branch protection rules in GitHub to prevent direct commits to `main` and enforce PR reviews for `develop` and `main`.
