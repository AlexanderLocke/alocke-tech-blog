const newPostFormHandler = async (event) => {
  event.preventDefault();

  const titleElement = document.querySelector('#post-title');
  const contentElement = document.querySelector('#post-content');
  const title = titleElement.value.trim();
  const content = contentElement.value.trim();

  try {
      const response = await fetch('/newpost', {
          method: 'POST',
          body: JSON.stringify({ title, body: content }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          console.log('Post created.')
      } else {
          throw new Error('Failed to create post');
      }
  } catch (error) {
      console.error(error);
      alert('An error occurred while creating the post');
  }
};

document
  .querySelector('.newpost-form')
  .addEventListener('submit', newPostFormHandler);
