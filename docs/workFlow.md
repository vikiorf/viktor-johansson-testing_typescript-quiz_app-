# Workflow

## Tasks ✔

Every feature should be broken down into small enough tasks to be able to handle the workload.

## Branching 🌿

Production-branch is used to deploy the code.

Staging-branch should be used for testing purposes. This environment should be as identical to the production environment as possible.

Main-branch is the developer branch. The main branch should at any time be able to be merged into production without any issues or unknown problems. In other words, main branch should always be functional.

Every task should have its own branch. The branch can then be merged to main using a pull request.

## Pull requests ⛓

When creating a pull request, the automatic tests should run automatically. If any tests fail, the pull request will not be merged until the tests pass.

## Deployments 🚀

TDB
