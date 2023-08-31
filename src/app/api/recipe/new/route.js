import { connectDB } from "@utils/database";
import Recipe from "@models/recipe";
export const POST = async (req) => {
    const { userId, name, dishType, time, servings, difficulty, ingredients, directions, imageUrl } = await req.json();
  
    try {
      // connect to DB
      await connectDB();
      // create new recipe
      const newRecipe = new Recipe({
        creator: userId,
        name,
        dishType,
        time,
        servings,
        difficulty,
        ingredients,
        directions,
        imageUrl, // Store the image URL
      });
      // save the recipe
      await newRecipe.save();
      // return the status
      return new Response(JSON.stringify(newRecipe), {
        status: 201,
      });
    } catch (error) {
      return new Response('Failed to create a new Recipe', { status: 500 });
    }
  };
  // ...
  