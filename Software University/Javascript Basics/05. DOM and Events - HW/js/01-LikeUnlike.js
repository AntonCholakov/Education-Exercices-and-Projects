function changeButton() {
    var buttonText = likeButton.innerHTML;

    if (buttonText === 'Like') {
        buttonText = 'Unlike';
    } else {
        buttonText = 'Like';
    }

    likeButton.innerHTML = buttonText;
}
var likeButton = document.getElementById('like-unlike');
likeButton.addEventListener('click', changeButton, false);