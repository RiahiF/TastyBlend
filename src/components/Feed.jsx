'use client'
import {useState, useEffect} from 'react'
import RecipeCard from './RecipeCard.jsx'
const RecipeCardList = ({data, handleTagClick}) => {
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <RecipeCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [posts, setPosts] = useState([])
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterRecipes = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.dishType) ||
        regex.test(item.name)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterRecipes(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterRecipes(tagName);
    setSearchedResults(searchResult);
  };
useEffect(()=>{
    const fetchRecipes = async () =>{
      const respone = await fetch('/api/recipe')
      const data = await respone.json()

      setPosts(data)
    }
    fetchRecipes()
  },[])


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
        type='text'
        placeholder='Search for a tag or username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        />
      </form>
      {/* All Recipes */}
      {searchText ? (
        <RecipeCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <RecipeCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
