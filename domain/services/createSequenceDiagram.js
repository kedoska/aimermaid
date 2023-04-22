import {run} from "@mermaid-js/mermaid-cli";
import diagramRepository from "../repositories/diagramRepository.js";

export default async (description, context) => {

    const startOfThePrompt = `Write the following sentence in mermaid format:`

    const prompt = `${startOfThePrompt}\n${description}`

    console.log(prompt)

    const {ai, storage} = context;

    const id = Math.random().toString(36).substr(2, 9);
    const mermaid = await ai.textToMermaid(prompt);

    const {saveDiagramToFile, getDiagramFilePath} = diagramRepository(storage)

    await saveDiagramToFile(id, mermaid)
    const diagramFilePath = await getDiagramFilePath(id)
    const imageFilePath = `${diagramFilePath}.png`

    const output = await run(diagramFilePath, imageFilePath);

    console.log(`file created at ${imageFilePath}`)
    console.log(output)
}
