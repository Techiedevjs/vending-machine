const toggleDisplay = () => {
    document.querySelector('.display').classList.toggle('hide')
}
document.addEventListener('keydown', evt => {
    if (evt.key === 'Home') {
        toggleDisplay();
    }
});