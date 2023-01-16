function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent = '';
  document.querySelector('.image').src = '';

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please input text to generate an image!');
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showerSpinner();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removerSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    const imageURL = data.data;

    document.querySelector('#image').src = imageURL;

    removerSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

function showerSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function removerSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
