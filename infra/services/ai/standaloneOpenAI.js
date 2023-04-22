import {Configuration, OpenAIApi} from "openai";
export default (apiKey) => {

    const configuration = new Configuration({
        apiKey
    });

    return new OpenAIApi(configuration);
}