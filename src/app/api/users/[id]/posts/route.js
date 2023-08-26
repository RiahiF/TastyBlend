import { connectDB } from "@utils/database";
import Recipe from "@models/recipe";

export const GET = async (req, {params}) =>{
    try {
        await connectDB()

        const recipes = await Recipe.find({
            creator: params.id
        }).populate('creator')

        return new Response(JSON.stringify(recipes), { status:200 })

    } catch (error) {
        return new Response('Failed to fetch recipes', { status:500 })
    }
}