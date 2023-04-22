import {config} from "dotenv";

config();

import ai from "../infra/services/ai/index.js";
import localStorage from "../infra/repositories/localStorage.js";

import createSequenceDiagram from "../domain/services/createSequenceDiagram.js";

;(async () => {

    const descriptions = `Marco writes a PoC to demostrate how to use the OpenAI API to generate a sequence diagram from a description of the system.
    After the PoC is done, he writes a blog post about it.
    After the blog post he may takes a break with a cup of coffee.`

    const context = {
        ai: ai(process.env.OPENAI_PROVIDER, process.env.OPENAI_API_KEY, process.env.OPENAI_API_ENDPOINT),
        storage: localStorage({basePath: './data'})
    }
    await createSequenceDiagram(descriptions, context)

})();
