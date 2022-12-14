function Footer() {
  return (
    <footer>
      <div>
        <div className="footerLogo"></div>
        <p className="brands">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-linkedin"></i>
        </p>
      </div>
      <div className="contact">
        <h3>Contact</h3>
        <p>
          <i className="fa-regular fa-location-dot acontact"></i>WA-11092
          Nowhere, WoodCity, Canada
        </p>
        <p>
          <i className="fa-regular fa-phone"></i>+1-784-886-5239
        </p>
        <p>
          <i className="fa-regular fa-envelope acontact"></i>
          <a href="mailto:nosaegharevba01@gmail.com">
            nosaegharevba01@gmail.com
          </a>
        </p>
      </div>
      <div className="rights">
        &copy;2022-website made by Egharevba Nosa. All right Reserved
      </div>
    </footer>
  );
}
export default Footer;
