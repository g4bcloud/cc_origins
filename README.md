# Lambda Project Boilerplate

This repository provides a comprehensive boilerplate for building serverless Lambda
functions using Node.js.

Whether you're starting a new project or integrating Lambda functions into an
existing application, this boilerplate simplifies the setup process and
accelerates development.

## Key Features

Minimal Configuration: Get started quickly with minimal setup. The boilerplate
includes pre-configured files and folder structure, reducing initial setup time.

Testing Support: Write comprehensive tests for your Lambda functions using popular
testing frameworks like Mocha. Ensure the reliability and correctness of your code
with automated unit and integration tests.

## Sonarqube Integration

Sonarqube integration is handled automatically by the CI pipeline. The `sonar-project.properties` file has been
deprecated and is no longer used.

## Testing

Please make sure to name all test files with the `.test.mjs` extension.

## Quicksight Setup

The QA Team uses AWS Quicksight to display information related to code coverage and
other quality metrics pulled from sonarqube. To that end, they require each project
to be tagged using specific key values.

This is done in the settings under *Settings > General > Topics*. The two key/value
pairs that need to be added are the following: `sf_type=node` and
`app_id=e7f25764-2401-4732-acb5-57631da4ace5`.

## Getting Started

0. Update the name of the project in `package.json`
1. Clone this repository to your local machine.
2. Install dependencies using npm or yarn.
3. Configure your AWS credentials (if needed) and environment variables.
4. Write your Lambda functions using the provided template.

## Contributing

Contributions are welcome! Whether it's bug fixes, feature enhancements,
or documentation improvements, feel free to open a merge request.

## Authors

The following is a list of contributors to this project:

- Karim Cheurfi <karim.cheurfi@consulting-for.accor.com>
- Gabriel Bruno <gabriel.bruno@accor.com>
- Youssef Ascour <youssef.ascour@accor.com>
- Frédéric GUIGUI <frederic.guigui@consulting-for.accor.com>
 