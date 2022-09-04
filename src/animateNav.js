function scrollEffect(scrollElement) {
  var scroll = window.pageYOffset;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (scroll > currentScroll) {
      scrollElement.current.style.top = "0";
    } else {
      scrollElement.current.style.top = "-300px";
    }
    scroll = currentScroll;
  });
}

export default scrollEffect;
