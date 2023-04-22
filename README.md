aimermaid
========

This PoC is a simple tool to generate mermaid diagrams from a simple text.

The idea is to use OpenAI to generate the Mermaid code from a text description.

### Requirements
  - OpenAI API key (or Azure OpenAI API key)
  - NodeJS

### Run
 - `npm install`
 - copy the `.env.example` file to `.env` and fill the variables
 - edit the `description` variable in the `app/cli.js` file
 - `npm start`

### Output example
<img src="https://raw.githubusercontent.com/kedoska/aimermaid/master/example/4nrkmrdny.mmd.png" />
