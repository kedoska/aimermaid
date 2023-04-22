import azureOpenAI from './azureOpenAI.js';
import standaloneOpenAI from './standaloneOpenAI.js';

export default (provider, apiKey, endpoint) => {

    const supportedProviders = ['azure', 'openai'];

    if (!supportedProviders.includes(provider)) {
        throw new Error(`Provider ${provider} not supported`);
    }

    let openai = null;

    if (provider === 'azure') {
        openai = azureOpenAI(apiKey, endpoint);
    } else if (provider === 'openai') {
        openai = standaloneOpenAI(apiKey);
    }

    const complete = async (settings) => {
        const {model = '', prompt = '', max_tokens = 60, temperature = 0} = settings;

        if (!openai) {
            throw new Error('OpenAI not initialized');
        }

        if (!prompt || !prompt.length) {
            throw new Error('Prompt is required');
        }

        if (!model || !model.length) {
            throw new Error('Model is required');
        }

        const response = await openai.createCompletion({
            model,
            prompt,
            temperature,
            max_tokens,
        });

        if (response.status !== 200) {
            throw new Error(`OpenAI API error: ${response.error}`);
        }
        console.dir(response.data)
        return response.data
    }

    const textToMermaid = async (prompt) => {
        const stop = '\n###';
        const data = await complete({
            model: 'text-davinci-003',
            prompt: `${prompt}\n${stop}`,
            max_tokens: 600,
            temperature: 0,
            stop,
            "top_p": 1,
            "n": 1,
            "stream": false,

        });
        let mermaid = data.choices[0].text;
        /// remove ```mermaid and ```
        mermaid = mermaid.replace('```mermaid', '');
        mermaid = mermaid.replace('```', '');
        mermaid = mermaid.split('\n').filter(line => line.trim()).join('\n');
        console.log(mermaid);
        return mermaid;
    }

    return {
        complete,
        textToMermaid,
    }
}