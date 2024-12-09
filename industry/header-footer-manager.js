class SpecialHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
           <header id="header" class="fixed-top d-flex flex-column">
           <div class="ecommerce-color-highlight marketplace-color-highlight food-delivery-highlight  education-highlight food-delivery-highlight rehabilitation-highlight"></div>
           <div class="container2 d-flex justify-content-between mt-2 mx-auto">
              <!--  logo -->
              <a href="../../index.html" class="logo mr-auto">
                  <img src="../../assets/images/logo.png" alt=""></a>
              <!--  nav start-->
              <nav class="nav-menu d-none d-lg-block">
                  <ul class="nav-list">
                      <!-- added a class for active -->
                      <li class="nav-item"><a href="../../index.html">Home</a></li>
                      <li class="nav-item"><a href="../../aboutus.html">About Us</a></li>
                      <li class="nav-item drop-down"><a href="">Services<i class="fas fa-angle-down ml-1 ms-1 pt-1"></i></a>
                          <ul>
                              <li><a href="../../service.html">All Services</a></li>
                              <li><a href="../../service-web-mobile-application.html">Web & Mobile Application</a></li>
                              <li><a href="../../service-robotic-process-automation.html">Robotic Process Automation</a>
                              </li>
                              <li><a href="../../service-blockchain-nft.html">Blockchain & NFT</a></li>
                              <li><a href="../../service-digital-transformation.html">Digital Transformation</a></li>
                              <li><a href="../../service-devops-consulting.html">Devops Consulting</a></li>
                              <li><a href="../../service-enterprise-solution.html">Enterprise Solution</a></li>
                              <li><a href="../../service-alml-solution.html">Al/ML Solution</a></li>
                              <li><a href="../../service-qa-services.html">QA Services</a></li>
                          </ul>
                      </li>
  
                      <li class="nav-item drop-down">
                          <a href="">Publications<i class="fas fa-angle-down ml-1 ms-1 pt-1"></i></a>
                          <ul>
                              <li><a href="../../portfolio.html">Portfolio</a></li>
                              <li><a href="../../product.html">Products</a></li>
                              <li><a href="../../case-studies.html">Case Studies</a></li>
                              <li><a href="../../our-solutions.html">Our Solutions</a></li>
                              <li><a href="../../tech-byte.html">Tech Bytes</a></li>
                              <li><a href="../../newsletter.html">Newsletter</a></li>

                          </ul>
                      </li>
                      <li class="nav-item drop-down"><a href="#">Industries<i class="fas fa-angle-down ml-1 ms-1 pt-1"></i></a>
                          <ul>
                              <li><a href="/industry/ecommerce/ecommerce.html">Ecommerce</a></li>
                               <li><a href="/industry/marketplace/ecommerce-marketplace.html">Ecommerce Marketplace</a></li>
                              <li><a href="/industry/Food-delivery/food-delivery.html">Food Delivery</a></li>
                            <li><a href="/industry/education/education.html">Education</a></li>
                            <li><a href="/industry/healthcare/healthcare.html">Health Care</a></li>
                            <li><a href="/industry/rehabilitation/index.html">Rehabilitation</a></li>
                          </ul>
                      </li>
  
                      <li class="nav-item"><a href="../../career.html">Career</a></li>
                      <li class="nav-item"><a href="../../contact.html">Contact</a></li>
                  </ul>
              </nav>
              <!-- .nav-menu end-->
          </div>
      </header>
          `;
    this.updateActiveNav();
  }

  updateActiveNav() {
    const navItems = this.querySelectorAll(".nav-item a");
    let currentPath = window.location.pathname;
    currentPath = currentPath.slice(1, currentPath.length);

    navItems.forEach((item) => {
      if (item.getAttribute("href") === currentPath) {
        item.parentElement.classList.add("active");
      } else {
        item.parentElement.classList.remove("active");
      }
    });
  }
}

class SpecialFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
          <footer class="footer-section pt-120">
  
              <div class="waves_left">
                  <img src="../../assets/images/footer/bg_left_top.png" class="wave_left" id="wave_left1">
                  <img src="../../assets/images/footer/bg_left_top.png" class="wave_left" id="wave_left2">
                  <img src="../../assets/images/footer/bg_left_top.png" class="wave_left" id="wave_left3">
                  <img src="../../assets/images/footer/bg_left_top.png" class="wave_left" id="wave_left4">
              </div>
              
              <div class="waves_right">
                  <img src="../../assets/images/footer/bg_right_bottom.png" class="wave_right" id="wave_right1">
                  <img src="../../assets/images/footer/bg_right_bottom.png" class="wave_right" id="wave_right2">
                  <img src="../../assets/images/footer/bg_right_bottom.png" class="wave_right" id="wave_right3">
                  <img src="../../assets/images/footer/bg_right_bottom.png" class="wave_right" id="wave_right4">
              </div>
              
   
          
          <div class="container">
              <div class="row">
                  <div class="col-xl-3 col-lg-6 col-md-6 order-xl-1 order-lg-1 order-md-1 order-sm-1 order-xs-1 pe-5 ">
                      <div class="footer-widget pr-5">
                          <div class="footer-logo">
                              <a href="../../index.html">
                                  <img src="../../assets/images/logo-two-white.png" alt="site-logo">
  
                              </a>
                          </div>
                          <p>We are constantly evolving and committed to serve the best to our customers.
                              Delivering
                              quality solutions has been a top priority
                              for us.</p>
  
                          <ul class="footer-social">
                              <li class="linkedin"><a href="https://www.linkedin.com/company/utkal-labs" target=”_blank”
                                      class="d-flex justify-content-center align-items-center">
                                      <i class="fa-brands fa-linkedin-in"></i></a>
  
                              </li>
                              <li class="facebook"><a href="https://www.facebook.com/utkallabsindia/" target=”_blank”
                                      class="d-flex justify-content-center align-items-center">
                                      <i class="fa-brands fa-facebook"></i></a>
                              </li>
  
                              <li class="twitter">
                                  <a href="https://twitter.com/UtkalLabs" target=”_blank”
                                      class="d-flex justify-content-center align-items-center">
                                      <i class="fa-brands fa-x-twitter"></i></a>
                              </li>
                              <li class="instagram">
                                  <a href="https://www.instagram.com/utkallabs/" target=”_blank”
                                      class="d-flex justify-content-center align-items-center">
                                      <i class="fa-brands fa-instagram"></i>
                                  </a>
                              </li>
  
                          </ul>
                      </div>
                  </div>
  
                  <div
                      class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 order-xl-3 order-lg-2 order-md-2 order-sm-2 order-xs-2">
                      <div class="row ps-xl-5 mt-md-0 mt-sm-5 mt-5">
                          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                              <div class="footer-widget">
                                  <h4 class="title">Company</h4>
                                  <ul class="footer-list">
                                      <li><a href="../../gallery.html">Gallery</a></li>
                                      <li><a href="../../portfolio.html">Portfolio</a></li>
                                      <li><a href="../../newsletter.html">Newsletter</a></li>
                                      <li><a href="../../case-studies.html">Case Studies</a></li>
                                  </ul>
                              </div>
                          </div>
                          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6" style="margin-bottom: 40px;">
                              <div class="footer-widget">
                                  <h4 class="title">Quick Links </h4>
                                  <ul class="footer-list">
                                      <li><a href="http://blog.utkallabs.com" target="_blank">Blogs</a></li>
                                      <li><a href="../../service.html">Services</a></li>
                                      <li><a href="../../career.html">Career</a></li>
                                      <li><a href="../../contact.html">Contact</a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div
                      class="col-xl-5 col-lg-6 col-md-12  order-xl-2 order-lg-3 order-md-3 order-sm-3 order-xs-3 img_container_main">
                      <div class="img_container">
                          <img class="img_monuments" src="../../assets/images/footer/footer_img.png" id="img_monuments">
                          <img src="../../assets/images/footer/pointer.png" id="pointer_left" alt="">
                          <img src="../../assets/images/footer/pointer.png" id="pointer_right" alt="">
                          <div id="usa_address" class="address">
                              <h2>USA</h2>
                              <p>PO Box 56903 <br> Sherman Oaks CA - 91413 </p>
                          </div>
                          <div id="ind_address" class="address">
                              <h2>INDIA</h2>
                              <p>D110, Raghunathpur <br> Bhubaneswar, Odisha - 751024 </p>
                          </div>
                          <svg height="0">
                              <!-- THE mask -->
                              <mask id="mask-image-container">
                                  <image id="mask-image" xlink:href="../../assets/images/footer/footer_img.png" filter="url(#filter)" /> 
                              </mask>
                              
                              <!-- the filter to make the image white -->
                              <filter id="filter">
                                  <feFlood flood-color="white" />
                                  <feComposite in2="SourceAlpha" operator="in" />
                              </filter>
                          </svg>
                      </div>
                  </div>
              </div>
          </div>
  
          <div class="copyright-wrapper">
              <div class="container">
                  <div class="copyright-area d-flex align-items-center justify-content-md-between justify-content-center">
                      <p>© 2024 Utkal Labs Pvt. Ltd. All Rights Reserved.</p>
                      <div>
                          <p><a href="../../privacypolicy.html" class="text-decoration-none">Privacy Policy</a> |
                              <a href="../../termsandconditions.html" class="text-decoration-none"> Terms &
                                  Conditions</a>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
  
      </footer>
          `;
  }
}

customElements.define("special-header", SpecialHeader);
customElements.define("special-footer", SpecialFooter);
