import { Schema, model, models } from 'mongoose';

const RecipeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  dishType: [{
    type: String,
    required: [true, 'DishType is required.'],
  }],
  time: {
    type: String,
    required: [true, 'Time is required.'],
  },
  servings: {
    type: String,
    required: [true, 'Servings is required.'],
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty is required.'],
  },
  ingredients: {
    type: String,
    required: [true, 'Ingredients is required.'],
  },
  directions: {
    type: String,
    required: [true, 'Directions is required.'],
  },
  imageUrl: {
    type: String, // Store the Cloudinary image URL here
    required: [true, 'Image URL is required.'],
  },
});

const Recipe = models.Recipe || model('Recipe', RecipeSchema);

export default Recipe;
