import { connectDB } from "@utils/database";
import Recipe from "@models/recipe";


// GET 
export const GET = async (req, {params}) =>{
    try {
        await connectDB()

        const recipe = await Recipe.findById(params.id).populate('creator')

        if(!recipe){
            return new Response("Recipe not found", {status:404})
        }

        return new Response(JSON.stringify(recipe), { status:200 })

    } catch (error) {
        return new Response('Failed to fetch recipes', { status:500 })
    }
}

// PATCH
export const PATCH = async (req, { params }) => {
    const { title, recipe, tag } = await req.json();

    try {
        await connectDB();

        const existingRecipe = await Recipe.findById(params.id);

        if (!existingRecipe) {
            return new Response('Recipe not found', { status: 404 });
        }

        existingRecipe.title = title;
        existingRecipe.recipe = recipe;
        existingRecipe.tag = tag;

        await existingRecipe.save();

        return new Response(JSON.stringify(existingRecipe), { status: 200 });
    } catch (error) {
        return new Response('Failed to update the recipe', { status: 500 });
    }
}

// DELETE
export const DELETE = async (req, {params})=>{

    try {
        await connectDB()

        await Recipe.findByIdAndRemove(params.id)

        return new Response('Recipe Deleted', {status:200})
        
    } catch (error) {
        return new Response('Failed to delete', {status:500})
    }
}