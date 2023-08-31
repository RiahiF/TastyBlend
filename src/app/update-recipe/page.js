'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'

const EditRecipe = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const recipeId = searchParams.get('id')
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
      name: '',
      dishType: [],
      time: '',
      servings: '',
      difficulty: '',
      ingredients: '',
      directions: '',
    })

    useEffect(()=>{
        const getRecipeDetails = async() =>{
            const respone= await fetch(`/api/recipe/${recipeId}`)

            const data = await respone.json()

            setPost({
                name: data.name,
                dishType: data.dishType,
                time: data.time,
                servings: data.servings,
                difficulty: data.difficulty,
                ingredients: data.ingredients,
                directions: data.directions
            })
        }

        if(recipeId) getRecipeDetails()
    },[recipeId])

    const updateRecipe = async (e) =>{
      e.preventDefault()
      setSubmitting(true)

        if(!recipeId){
            return alert('Recipe ID not found')
        }

      try {
        const response = await fetch(`/api/recipe/${recipeId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            name: post.name,
            dishType: post.dishType,
            time: post.time,
            servings: post.servings,
            difficulty: post.difficulty,
            ingredients: post.ingredients,
            directions: post.directions,
          })
        })
        if(response.ok){
          router.push('/')
        }
      } catch (error) {
        console.log(error)
      }finally{
        setSubmitting(false)
      }

    }
  return (
    <Form
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updateRecipe}
    />
  )
}

export default EditRecipe