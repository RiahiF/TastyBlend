import Link from 'next/link'

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
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
                <span className='font-satoshi font-semibold text-base text-gray-700'>Your Recipe Title</span>
                <input
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})}
                placeholder='Your recipe title'
                required
                className='form_input'
                />
            </label>
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>Your Recipe Content</span>
                <textarea
                value={post.recipe}
                onChange={(e) => setPost({...post, recipe: e.target.value})}
                placeholder='Your recipe content'
                required
                className='form_textarea'
                />
            </label>
            <label>
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
            </label>
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