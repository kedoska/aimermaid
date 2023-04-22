import {Configuration, OpenAIApi} from "azure-openai";
export default (apiKey, endpoint) => {

    const configuration = new Configuration({
        apiKey,
        azure: {
            apiKey,
            endpoint,
        }
    });

    return new OpenAIApi(configuration);
}