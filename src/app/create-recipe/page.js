'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import { uploadImageToCloudinary } from '@utils/cloudinary'; // Create this utility function

const CreateRecipe = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    name: '',
    dishType: [],
    time: '',
    servings: '',
    difficulty: '',
    ingredients: '',
    directions: '',
  });
  const [image, setImage] = useState(null); // New state for image

  const createRecipe = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    try {
      const imageUrl = await uploadImageToCloudinary(image);
  
      const response = await fetch('/api/recipe/new', {
        method: 'POST',
        body: JSON.stringify({
          name: post.name,
          dishType: post.dishType,
          time: post.time,
          servings: post.servings,
          difficulty: post.difficulty,
          ingredients: post.ingredients,
          directions: post.directions,
          userId: session?.user.id,
          imageUrl: imageUrl,
        }),
      });
  
      if (response.ok) {
        console.log(imageUrl)
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      image={image}
      setImage={setImage}
      submitting={submitting}
      handleSubmit={createRecipe}
    />
  );
};

export default CreateRecipe;
