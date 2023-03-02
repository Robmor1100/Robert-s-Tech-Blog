const comment = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim();
    const postId = document.querySelector(".saveComment").getAttribute("value");
    if (comment) {
        const response = await fetch(`/api/comment`, {
            method: 'POST',
            body: JSON.stringify({
                postId,
                body: comment,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to comment');
        }
    }
};   
document
    .querySelector('.saveComment')
    .addEventListener('click', comment);
