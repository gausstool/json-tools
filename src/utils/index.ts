function isMobile() {
    if (window.innerWidth >= 960) {
        return false;
    }
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
export { isMobile }