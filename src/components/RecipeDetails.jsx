'use client'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import calculateCalories from '@app/api/calories/route';

const RecipeDetails = ({ post }) => {

    const [save , setSave] = useState(false)

    const [calories, setCalories] = useState(null); // State to store calories

    useEffect(() => {
      // Calculate calories when the component mounts or when post.ingredients change
      if (post.ingredients) {
        calculateCalories(post.ingredients, '/FbDRSCEtwKifHgonncq2g==8XVmLeS7NonPey6c') // Replace with your API key
          .then((data) => {
            // Calculate and set the total calories
            const totalCalories = data.reduce((acc, item) => acc + item.calories, 0);
            setCalories(totalCalories);
          })
          .catch((error) => {
            console.error('Error calculating calories:', error);
          });
      }
    }, [post.ingredients]);

    const handleSave = () =>{
        console.log('handleSave called');
        setSave((prevSave) => !prevSave);
    }
  return (
    <section className="container mx-auto relative">
            <div className="absolute top-5 right-5 cursor-pointer z-10" onClick={handleSave}>{save ? <BookmarkIcon /> : <BookmarkBorderIcon />}</div>
        <div className="overflow-hidden rounded-xl border border-[#e7e7e7] bg-emerald-50 p-5">
            <div className=" flex flex-wrap ">
                <div className="w-full px-4 lg:w-1/2">
                    {post.imageUrl && (
                        <div className="recipe-image">
                        <Image
                            className="object-cover rounded-md cursor-pointer  w-full h-[400px]"
                            src={post.imageUrl}
                            alt="recipe_image"
                            width={400} 
                            height={400} 
                            />
                        </div>
                    )}
                </div>
                <div className="w-full px-4 lg:w-1/2 relative">
                    <h2 className="mb-5 text-xl font-semibold text-black sm:text-3xl lg:text-2xl xl:text-3xl">{post.name}</h2>
                    <p className="mb-5 text-base font-medium text-body-color text-gray-400">By <span className='text-slate-800 font-medium'>{post.creator.username}</span></p>
                    <div className="flex flex-wrap items-center w-full">
                        <div className="flex items-center pr-4">
                            <h3 className="text-base font-regular text-gray-400"> <span className="text-slate-800 font-medium">Prep</span> {post.time}</h3>
                        </div>
                        <div className="flex items-center pr-4">
                            <h3 className="text-base font-regular text-slate-900">|</h3>
                        </div>

                        <div className="flex items-center pr-4">
                            <span className="text-base font-medium text-gray-400">
                            <span className="text-slate-800 font-medium">Servings </span>{post.servings}
                            </span>
                        </div>
                        <div className="flex items-center pr-4">
                            <h3 className="text-base font-regular text-slate-900">|</h3>
                        </div>
                        <div className="flex items-center pr-4">
                            <span className="text-base font-medium text-gray-400">
                            <span className="text-slate-800 font-medium">Difficulty </span>{post.difficulty}
                            </span>
                        </div>
                        <div className="flex items-center pr-4">
                            <h3 className="text-base font-regular text-slate-900">|</h3>
                        </div>
                        <div className="flex items-center pr-2">
                            <span className="text-base font-medium text-gray-400">
                            <span className="text-slate-800 font-medium">Calories </span>
                            {calories !== null && (
                                <span className="text-base font-medium text-gray-400">
                                {calories.toFixed(0)}
                                </span>
                            )}
                            </span>
                        </div>
                    </div>
                    <div className="mt-5">
                        <span className='mb-4 text-md font-semibold text-black'>
                        Chicken fajitas are an easy and flavorful weeknight meal. A classic Mexican recipe, juicy chicken is seasoned, seared and cooked to perfection, then tossed with sauteed bell peppers and onions. A squeeze of fresh lime adds a punch of flavor and the chicken fajitas are served with warm tortillas and toppings. You can’t beat this healthy family favorite recipe.
                        </span>
                    </div>
                    <div className="absolute bottom-0 left-3">
                        {post.dishType.map((type, index) => (
                            <span
                            key={index}
                            className="tag cursor-pointer bg-gray-200 w-fit text-gray-600 pt-1 pb-1 pl-3 pr-3 rounded-lg ml-3 mb-3 "
                            >
                            {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
      </div>
      <section className='bg-white pt-[120px] pb-[90px]'>
        <div className="container mx-auto">
            <div className="flex flex-wrap">
                <div className="w-full px-4 lg:w-1/2">
                    <div className="mb-12">
                        <span className='mb-4 text-lg font-bold text-black sm:text-xl'>Ingredients</span>
                        <p className='mb-6 mt-5 text-base font-medium text-body-color'>
                        {post.ingredients.split(/['.,']/).map((ingredient, index) => (
                            <span key={index} className='text-base font-medium text-gray-600'>
                                {ingredient.trim()}
                                <br />
                            </span>
                        ))}
                        </p>
                    </div>
                </div>
                <div className="w-full px-4 lg:w-1/2">
                    <div className="mb-12">
                        <span className='mb-4 text-lg font-bold text-black sm:text-xl'>Directions</span>
                        <p className='mb-6 mt-5 text-base font-medium text-body-color'>
                        {post.directions.split('\n').filter((step) => step.trim() !== '').map((direction, index) => (
                            <span key={index} className='text-base font-medium text-gray-600'>
                                <span className='text-slate-900  font-bold text-md'>Step {index +1}</span> <br />
                                {direction.trim()}

                                <br />
                                <br />
                            </span>
                        ))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </section>
  );
};

export default RecipeDetails;
