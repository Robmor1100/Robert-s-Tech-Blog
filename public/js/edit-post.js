const editPostHandler = async (event) => {
    try {
        event.preventDefault();
        const title = document.querySelector('#post-title').value.trim();
        const body = document.querySelector('#post-body').value.trim();
        const id = document.querySelector(".saveEdit").getAttribute("value");

        if (title && body) {
            const response = await fetch(`/api/post/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    postId: id,
                    title,
                    body,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Failed to edit post');
            }
        }
    } catch (err) {
        console.log(err);
    }
};

document
    .querySelector('.saveEdit')
    .addEventListener('click', editPostHandler);


         

