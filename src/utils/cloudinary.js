export async function uploadImageToCloudinary(imageFile) {
    const cloudName = 'duduyg7yq' // Replace with your Cloudinary cloud name
    const uploadPreset = 'djkyd3uq'; // Replace with your Cloudinary upload preset
  
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', uploadPreset);
  
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
  
    const data = await response.json();
    console.log(formData)
    return data.secure_url; // Return the uploaded image URL
  }
  