import { Schema, model, models } from 'mongoose';

const RecipeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  recipe: {
    type: String,
    required: [true, 'Recipe is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
  imageUrl: {
    type: String, // Store the Cloudinary image URL here
    required: [true, 'Image URL is required.'],
  },
});

const Recipe = models.Recipe || model('Recipe', RecipeSchema);

export default Recipe;
