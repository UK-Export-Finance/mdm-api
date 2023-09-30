# Git Hub Actions (GHA) 🚀

GitHub Actions has been widely used to define custom workflows (using YAML syntax) to build, test, lint and deploy out code directly from our public GitHub repositories.

## Infrastructure

This is a GitHub Action that creates the infrastructure for an APIM (Azure API Management) system. It sets up a base infrastructure in Azure, creates a container registry, virtual network, container app environment, and defines IP restrictions. After the setup is complete, it configures the APIM system by creating a product and importing an API.
The action runs on Azure with the self-hosted, APIM, and infrastructure tags. It triggers when a push is made to the infrastructure branch and runs only when the infrastructure.yml file within the .github/workflows directory is modified.
The action defines several environment variables for the product, environment, target, and timezone. It configures the Azure CLI defaults, logs in to Azure, and creates a resource group, container registry, virtual network, and container app environment.
It then sets IP restrictions and configures the APIM system by creating a product and importing an API. The product is named apim-{product}-mdm, and the imported API has the display name MDM with the path /mdm. The API is imported from a container app environment that was created earlier.
The action has three steps: setup, base, ca, and apim. The setup step sets up infrastructure variables, and each of the next three steps executes a set of specific commands that create the infrastructure, configure the container app, and configure the APIM system.

## Deployment

### Script

#### CICD 📝

This Bash script represents a Continuous Integration and Continuous Deployment (CICD) process.

#### Color Variables

- `RED` 🟥: Represents the color code for red.
- `GREEN` 🟩: Represents the color code for green.
- `BLUE` 🔵: Represents the color code for blue.
- `YELLOW` 🟨: Represents the color code for yellow.
- `NC` ⬛: Represents the color code for no color (default).

#### User Input

The script prompts the user to select an option from the following:

- `${YELLOW}0. Infrastructure 🔧${NC}`
- `${BLUE}1. Deployment 🧪${NC}`
- `${RED}2. ACR Purge 🗑️${NC}`

#### Option Handling

Based on the user's selection, the script performs the following actions:

#### Infrastructure 🔧

- Sets the `destination` variable to "infrastructure".
- Sets the `branch` variable to "main".

#### Deployment 🧪

- Prompts the user to enter a value for the `destination` variable.
- Sets the `branch` variable to "main".

#### ACR Purge 🗑️

- Clears the values of the `destination` and `branch` variables.
- Runs an Azure CLI command to purge specific resources in an Azure Container Registry (ACR).

#### Deployment Logic

If both `destination` and `branch` variables are not empty, the script performs the following actions:

- Checks out the `branch` and pulls the latest changes.
- Displays information about the latest push commit on the `branch`.
- Creates a new branch based on the `destination` value.
- Force pushes the new branch to the remote repository and sets the upstream branch.
- Switches back to the original `branch`.
- Deletes the new branch.
- Prints a success message indicating the deployment initiation and the switch to the original `branch`.

### Workflow: Deployment 🚀

This workflow is triggered on push events to the `dev`, `staging`, and `production` branches, and specific file modifications.

#### Environment Variables

- `PRODUCT` 📦: Represents the name of the product ("apim").
- `ENVIRONMENT` 🌍: Represents the name of the environment, which is retrieved from the GitHub ref name.
- `TIMEZONE` 🕒: Specifies the timezone as "Europe/London."
- `FROM` 📁: Represents a base artifact, with the value "latest."

#### Jobs

##### 1. Setup 🔧

- This job sets up deployment variables.
- It runs on a self-hosted runner with the "APIM" and "deployment" labels.
- Outputs:
  - `product`: Contains the value of the `PRODUCT` environment variable.
  - `environment`: Contains the value of the `ENVIRONMENT` environment variable.
  - `timezone`: Contains the value of the `TIMEZONE` environment variable.
- Steps:
  - Environment 🧪: Displays the environment set to the `ENVIRONMENT` value.
  - Timezone 🌐: Displays the timezone set to the `TIMEZONE` value.

##### 2. MDM 📦️

- This job represents the deployment of the MDM (Master Data Management) micro-service.
- Depends on the successful completion of the **Setup** job.
- Environment: Uses the `environment` output from the **Setup** job.
- Environment Variables:
  - `NAME` 📁: Represents the name of the micro-service ("mdm").
  - `ENVIRONMENT` 🌍: Represents the environment name.
- Runs on a self-hosted runner with the "APIM" and "deployment" labels.
- Steps:
  1. Repository 🗃️: Checks out the repository using the `actions/checkout` action.
  2. Azure 🔐: Authenticates with Azure using the `azure/login` action.
  3. CLI 📝: Sets up CLI commands to retrieve various Azure resources and store them as environment variables.
  4. Defaults ✨: Uses the Azure CLI to configure default settings.
  5. ACR 🔐: Logs in to an Azure Container Registry (ACR) using the `azure/docker-login` action.
  6. Artifacts 🗃️: Builds and pushes Docker images to the ACR.
  7. Revisions 🔀: Uses the Azure CLI to update a container application with the new image and set environment variables.
  8. Import ⬇️: Imports an API specification to an Azure API Management (APIM) service.

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
