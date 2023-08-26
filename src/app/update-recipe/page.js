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
        title:'',
        recipe:'',
        tag:'',
    })

    useEffect(()=>{
        const getRecipeDetails = async() =>{
            const respone= await fetch(`/api/recipe/${recipeId}`)

            const data = await respone.json()

            setPost({
                title: data.title,
                recipe: data.recipe,
                tag: data.tag
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
            title: post.title,
            recipe: post.recipe,
            tag: post.tag
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