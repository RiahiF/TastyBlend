'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from '@components/Profile.jsx'

const MyProfile = () => {

    const { data:session } = useSession()
    const [ posts, setPosts ] = useState([])
    const router = useRouter()

    useEffect(()=>{
        const fetchRecipes = async () =>{
          const respone = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await respone.json()
    
          setPosts(data)

        }

        if(session?.user.id){
            fetchRecipes()
        }
      },[])
    
    const handleEdit = (post) =>{
        router.push(`/update-recipe?id=${post._id}`)
    }

    const handleDelete = async (post) => {
      const hasConfirmed = confirm('Are you sure you want to delete this Recipe ?')

      if(hasConfirmed){
        try {
          await fetch(`/api/recipe/${post._id.toString()}`, {
            method: 'DELETE'
          })

          const filteredPosts = posts.filter((p) => p._id !== post._id)

          setPosts(filteredPosts)
        } catch (error) {
          console.log(error)
        }
      }
    }
  return (
    <Profile
    name='My'
    desc="Welcome to your Profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default MyProfile