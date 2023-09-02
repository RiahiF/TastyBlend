import axios from 'axios';

const calculateCalories = async (ingredients, apiKey) => {
  try {
    const response = await axios.get(
      `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(
        ingredients
      )}`,
      {
        headers: {
          'X-Api-Key': apiKey,
        },
      }
    );

    if (response.status === 200) {
      return response.data.items;
    } else {
      throw new Error('Unable to fetch nutrition data');
    }
  } catch (error) {
    throw error;
  }
};

export default calculateCalories;
