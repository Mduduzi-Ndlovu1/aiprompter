// Get (read)

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (requests, {params}) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate("creator");
        if (!prompt) {
            return new Response("Prompt Not Found", { status: 404 });
        }
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500});
    }
}
// Patch (update)

export const PATCH = async (requests, {params}) => {
    const { prompt, tag } = await requests.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt Not Found", { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200})
    } catch (error) {
        return new Response("Failed to Update Prompt", {status: 500})
    }
}
// Delete (delete)

export const DELETE = async (requests, {params}) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt deleted successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to delete Prompt", {status: 500})
    }
}