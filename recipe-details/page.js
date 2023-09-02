// pages/recipe-details.js
'use client'
import React, { useEffect, useState } from "react";
import RecipeDetails from "@components/RecipeDetails";
import { useSearchParams } from "next/navigation";

const RecipeDetailsPage = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (postId) {
        try {
          const response = await fetch(`/api/recipe/${postId}`);
          if (response.ok) {
            const data = await response.json();
            setPost(data);
          } else {
            console.error("Failed to fetch post details");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchPostDetails();
  }, [postId]);

  return (
    <div>
      {post ? (
        <RecipeDetails post={post} />
      ) : (
        <div>Loading...</div> // You can display a loading indicator here
      )}
    </div>
  );
};

export default RecipeDetailsPage;
