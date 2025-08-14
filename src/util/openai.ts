import { AzureKeyCredential, OpenAIClient } from "@azure/openai";
import axios from "axios";

export const getOnYourData = async (message: string): Promise<any[]> => {
  return new Promise(async (resolve, reject) => {
    const endpoint = process.env.AZURE_OPENAI_API_ENDPOINT!;
    const azureApiKey = process.env.AZURE_OPENAI_API_KEY!;
    const deploymentId = process.env.AZURE_OPENAI_API_DEVELOPMENT_ID!;

    console.log(" on your data start");

    const apiurl = "";

    const requestData = {
      message: [{ role: "user", content: message }],
    };

    const res = await axios.post(apiurl, requestData);
    const content = `
        # 質問
        ${message}
        # 回答
        ${res.data}
        `;

    const messages: any[] = [
      {
        role: "system",
        content: "You are a helpful assistant",
      },
      {
        role: "user",
        content,
      },
    ];

    const client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(azureApiKey)
    );

    const result = await client.getChatCompletions(deploymentId, messages);

    resolve(result.choices);
  });
};
