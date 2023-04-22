import {config} from "dotenv";

config();

import ai from "../infra/services/ai/index.js";
import localStorage from "../infra/repositories/localStorage.js";

import createSequenceDiagram from "../domain/services/createSequenceDiagram.js";

;(async () => {

    const descriptions = `users modifies the app/cli.js file
    user executes the app/cli.js file
    the app reads the .env file
    the app invokes the createDiagram function with the descriptions
    the createDiagram function calls the AI service to generate the mermaid from the descriptions
    the mermaid code is stored in the local storage
    the mermaidjs library generates the diagram from the mermaid code in the local storage`

    const context = {
        ai: ai(process.env.OPENAI_PROVIDER, process.env.OPENAI_API_KEY, process.env.OPENAI_API_ENDPOINT),
        storage: localStorage({basePath: './data'})
    }
    await createSequenceDiagram(descriptions, context)

})();
