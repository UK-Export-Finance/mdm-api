# Git Hub Actions (GHA) 🚀
GitHub Actions has been widely used to define custom workflows (using YAML syntax) to build, test, lint and deploy out code directly from our public GitHub repositories.

## Infrastructure

This is a GitHub Action that creates the infrastructure for an APIM (Azure API Management) system. It sets up a base infrastructure in Azure, creates a container registry, virtual network, container app environment, and defines IP restrictions. After the setup is complete, it configures the APIM system by creating a product and importing an API. 
The action runs on Azure with the self-hosted, APIM, and infrastructure tags. It triggers when a push is made to the infrastructure branch and runs only when the infrastructure.yml file within the .github/workflows directory is modified. 
The action defines several environment variables for the product, environment, target, and timezone. It configures the Azure CLI defaults, logs in to Azure, and creates a resource group, container registry, virtual network, and container app environment. 
It then sets IP restrictions and configures the APIM system by creating a product and importing an API. The product is named apim-{product}-mdm, and the imported API has the display name MDM with the path /mdm. The API is imported from a container app environment that was created earlier. 
The action has three steps: setup, base, ca, and apim. The setup step sets up infrastructure variables, and each of the next three steps executes a set of specific commands that create the infrastructure, configure the container app, and configure the APIM system.

## Deployment

### GHA
This is a YAML file for a GitHub Action that deploys an APIM system for the MDM micro-service. It defines two jobs: "setup" that sets environment variables, and "mdm" that deploys the MDM micro-service to a container app environment. 
The action triggers when a push is made to the "dev" branch and runs only when files in specific directories are modified. It defines several environment variables, including "product," "environment," and "timezone."
The "mdm" job has several steps, including checking out the repository, logging in to Azure, and configuring the Azure CLI defaults. The action also sets up a container registry, builds and pushes Docker images, and updates the container app with environment variables.
It is assumed that the secrets referenced in the action definition (e.g. ACR_USERNAME and ACR_PASSWORD) are set up beforehand in the repository's secrets.

### Bash
This is a Bash script for a deployment strategy for a project. It prompts the user with a list of deployment destinations and asks for input to select the destination. The script sets the destination and the branch for the deployment based on the user's input. If the user selects ACR Purge, the script runs the az acr run command to purge the ACR repository based on specified filter and ago duration. After setting the destination and branch, the script displays the latest push commit for the selected branch, creates a new branch based on the destination, and pushes the changes to that branch. Then the script cleans up the local branches and notifies the user that the deployment has been initiated. The script version and author information are also provided at the end of the script.

## SCA
This is a GitHub Action YAML file that sets up environment variables and performs various source code analysis (SCA) tasks on the MDM-API project when a pull request is made to the main branch. The code quality SCA is performed by Codacy and the licensing SCA is performed by Fossa. 
The first job, "setup," sets the environment variables and outputs them for use in later jobs. The next two jobs, "codacy" and "license," run on the "ubuntu-latest" operating system and are triggered by the "setup" job's completion. 
The "codacy" job uses the Codacy analysis CLI action to perform SCA for code quality. Similarly, the "license" job uses the Fossa action to perform SCA for licensing. 
Secrets, such as the Fossa API key, are assumed to be set up beforehand in the repository's secrets.

## TEST
This is a GitHub Actions YAML file that is responsible for initiating unit tests (Jest) and API tests (Jest) upon a pull request (PR) creation on the main branch. 
The first job, "setup," sets environment variables for the dev environment, a London timezone, and Node.js version 18. It also outputs these variables for later jobs to use.
The second job, "unit-tests," runs on the ubuntu-latest operating system and executes the unit tests. It uses the output from the "setup" job to set the environment name and timezone, checks out the repository, sets up Node.js, installs dependencies using npm ci, and executes the unit tests using npm run unit-test.

## Lint
This code is a GitHub Actions YAML file that is responsible for initiating linting checks upon a pull request (PR) creation on the main branch for a Node.js project. The on event is set to pull_request with specified branches and paths. The file has two jobs; "setup" and "lint". The "setup" job sets environment variables for the dev environment, a London timezone, and Node.js version 18, then output these variables for later jobs to use. The "lint" job runs on the ubuntu-latest operating system, sets up the environment name and timezone using the output from the "setup" job, checks out the repository, sets up Node.js, installs dependencies, and executes the linting using npm run lint.

## Publish
This is a GitHub Actions YAML file that automates the process of releasing an updated package for a Node.js project. The event that triggers this script is when the main branch is pushed to. There is only one job in this file, which sets up the necessary components for a successful release. This job is called "release", runs on the ubuntu-latest operating system, and uses the "google-github-actions/release-please-action@v3" GitHub Action for automating the release. 

The "release" job consists of three steps. The first step, "New release" sets up the release parameters and uses the Google GitHub Actions Release Please Action to create a new release. In the "with" block, the release type is set to "node", and the package name is set to "uk-export-finance/mdm-api". There are also four changelog types defined in this step: "feat", "fix", "chore", and "docs". These define the types of changes that will be written to the CHANGELOG.md file. Finally, there is a list of extra files that will be included in the release, which include README.md and CHANGELOG.md.
