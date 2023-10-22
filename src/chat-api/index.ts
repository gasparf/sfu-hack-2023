import OpenAi from 'openai';


const openai = new OpenAi({
    apiKey: "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",
    dangerouslyAllowBrowser: true
})

export const askChat = async (message: string) => {
    const assistant_prompt = "CalorizAI: You are CalorizAI. I'm here to provide professional advice on diet, health, and mental well-being. Please feel free to ask any questions related to these fields, and I'll do my best to assist you. If you have a question that's outside of this domain, I won't be able to provide an answer."
    const chatCompletion = await openai.chat.completions.create({
        messages: [{role: "assistant", content: assistant_prompt+message}],
        model: "gpt-3.5-turbo",
    });

    return chatCompletion.choices
}