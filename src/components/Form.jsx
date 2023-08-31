import Link from 'next/link'
const Form = ({type, post, setPost, image, setImage, submitting, handleSubmit}) => {

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
      };

      const handleDishTypeChange = (type, isChecked) => {
        if (isChecked) {
          setPost((prevPost) => ({
            ...prevPost,
            dishType: [...prevPost.dishType, type],
          }));
        } else {
          setPost((prevPost) => ({
            ...prevPost,
            dishType: prevPost.dishType.filter((t) => t !== type),
          }));
        }
      };

  return (
    <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>
                {type} Recipe
            </span>
        </h1>
        <p className='desc text-left max-w-md'>
            {type} & share delecious recipes with the world
            and let your food-taste run wild.
        </p>
        <form
        onSubmit={handleSubmit}
        className='w-full mt-10 max-w-2xl flex flex-col gap-7 glassmorphism'
        >
            
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>Recipe Name</span>
                <input
                value={post.name}
                onChange={(e) => setPost({...post, name: e.target.value})}
                placeholder='Your recipe name'
                required
                className='form_input'
                />
            </label>
            <label className='font-satoshi font-semibold text-base text-gray-700'>
  Dish Type
</label>
<div className='mt-1 flex gap-2 font-inter'>
  <label className='flex  items-center gap-2 cursor-pointer'>
    <input
      type='checkbox'
      checked={post.dishType.includes('Main Dish')}
      onChange={(e) => handleDishTypeChange('Main Dish', e.target.checked)}
      className='form_checkbox'
    />
    Main Dish
  </label>
  
  <label className='flex items-center gap-2 cursor-pointer'>
    <input
      type='checkbox'
      checked={post.dishType.includes('Side Dish')}
      onChange={(e) => handleDishTypeChange('Side Dish', e.target.checked)}
      className='form_checkbox'
    />
    Side Dish
  </label>
  <label className='flex items-center gap-2 cursor-pointer'>
    <input
      type='checkbox'
      checked={post.dishType.includes('Appetizer')}
      onChange={(e) => handleDishTypeChange('Appetizer', e.target.checked)}
      className='form_checkbox'
    />
    Appetizer
  </label>
  <label className='flex items-center gap-2 cursor-pointer'>
    <input
      type='checkbox'
      checked={post.dishType.includes('Soup')}
      onChange={(e) => handleDishTypeChange('Soup', e.target.checked)}
      className='form_checkbox'
    />
    Soup
  </label>
  <label className='flex items-center gap-2 cursor-pointer'>
    <input
      type='checkbox'
      checked={post.dishType.includes('Salad')}
      onChange={(e) => handleDishTypeChange('Salad', e.target.checked)}
      className='form_checkbox'
    />
    Salad
  </label>
  <label className='flex items-center gap-2 cursor-pointer'>
    <input
      type='checkbox'
      checked={post.dishType.includes('Dessert')}
      onChange={(e) => handleDishTypeChange('Dessert', e.target.checked)}
      className='form_checkbox'
    />
    Dessert
  </label>
  <label className='flex items-center gap-2 cursor-pointer'>
    <input
      type='checkbox'
      checked={post.dishType.includes('Drink')}
      onChange={(e) => handleDishTypeChange('Drink', e.target.checked)}
      className='form_checkbox'
    />
    Drink
  </label>
  
  {/* Add more checkboxes for other dish types */}
</div>

            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>Cooking Time</span>
                <input
                value={post.time}
                onChange={(e) => setPost({...post, time: e.target.value})}
                placeholder='ex: 20 mins'
                required
                className='form_input'
                />
            </label>
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>No. of Servings</span>
                <input
                value={post.servings}
                onChange={(e) => setPost({...post, servings: e.target.value})}
                placeholder='ex: 4'
                required
                className='form_input'
                />
            </label>
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>Difficulty</span>
                <input
                value={post.difficulty}
                onChange={(e) => setPost({...post, difficulty: e.target.value})}
                placeholder='ex: Moderate'
                required
                className='form_input'
                />
            </label>
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Recipe Image
                </span>
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='form_input'
                />
            </label>    
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>Ingredients</span>
                <textarea
                value={post.ingredients}
                onChange={(e) => setPost({...post, ingredients: e.target.value})}
                placeholder='Your recipe content'
                required
                className='form_textarea'
                />
            </label>
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>Directions</span>
                <textarea
                value={post.directions}
                onChange={(e) => setPost({...post, directions: e.target.value})}
                placeholder='Your recipe content'
                required
                className='form_textarea'
                />
            </label>
            {/* <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Tag {` `}
                    <span className='font-normal'>(#italian, #chinesse, #spicy)</span>
                </span>
                <input
                value={post.tag}
                onChange={(e) => setPost({...post, tag: e.target.value})}
                placeholder='#tag'
                required
                className='form_input'
                />
            </label> */}
            <div className="flex-end mx-3 mb-5 gap-4">
                <Link href='/' className='text-gray-500 text-sm'>
                    Cancel
                </Link>
                <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
                    {submitting ? `${type}...` : type}
                </button>
            </div>
        </form>
    </section>
  )
}

export default Form