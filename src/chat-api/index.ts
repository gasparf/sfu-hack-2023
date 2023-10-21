import OpenAi from 'openai';


const openai = new OpenAi({
    apiKey: process.env.NEXT_PUBLIC_CHAT_API,
    dangerouslyAllowBrowser: true
})

export const askChat = async (message: string) => {
    const assistant_prompt = "You are a medical, diet coach that gives advice only to elements related to diet. People will be asking you advise, opinion, help reagrding their food and how to aim to their goal to get fit."
    const chatCompletion = await openai.chat.completions.create({
        messages: [{role: "assistant", content: assistant_prompt+message}],
        model: "gpt-3.5-turbo",
    });

    return chatCompletion.choices
}