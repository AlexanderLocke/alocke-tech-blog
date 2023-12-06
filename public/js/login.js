const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
      try {
          const response = await fetch('/login', {
              method: 'POST',
              body: JSON.stringify({ username, password }),
              headers: { 'Content-Type': 'application/json' },
          });
          console.log(response.message);

          if (response.ok) {
              document.location.replace('/');
          } else {
              alert('Failed to log in');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
