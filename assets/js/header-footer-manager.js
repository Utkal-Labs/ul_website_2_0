class SpecialTopHeader extends HTMLElement {
    connectedCallback() {
        // Add the Tawk.to live chat script
        const tawkScript = document.createElement("script");
        //   script.src = "//code.tidio.co/mxyjcnentsyge1vrrztl3hixdvtd9bws.js";
        //   document.body.appendChild(script);
        tawkScript.async = true;
        tawkScript.src = 'https://embed.tawk.to/65f420d78d261e1b5f6de6f5/1hp0q0jof';
        tawkScript.charset = 'UTF-8';
        tawkScript.setAttribute('crossorigin', '*');
        document.head.appendChild(tawkScript);

        // Add clutch-footer-js
        const clutchScript = document.createElement("script");
        clutchScript.src = "https://widget.clutch.co/static/js/widget.js";
        clutchScript.async = true;
        document.head.appendChild(clutchScript);
        // end clutch-footer

        // Add the top header HTML content
        this.innerHTML = `
        <div id="topbar" class="d-none d-lg-flex align-items-center fixed-top">
          <div class="container2 d-flex align-items-center justify-content-between">
            <div class="upper-section">
  
              <div class="letside-topnavbar">
  
                <div class="topnavbar-call2">
                  <a href="mailto:sales@utkallabs.com">
                    <img src="assets/images/icon/gmail.png" alt="Email" width="18" height="18">
                    <span>sales@utkallabs.com</span>
                  </a>
                </div>
  
                <div class="topnavbar-call2">
                  <a href="tel:+91 93383 08255">
                    <img src="assets/images/icon/india.png" alt="INDIA Flag" width="18" height="18">
                    <span>+91 93383 08255</span>
                  </a>
                </div>
  
                <div class="topnavbar-call2">
                  <a href="tel:+1 32390 05072">
                    <img src="assets/images/icon/usa.png" alt="USA Flag" width="18" height="18">
                    <span>+1 32390 05072</span>
                  </a>
                </div>
  
              </div>
  
              <div class="right-side">
                <div class="search-bar">
                  <form class="header-search-form">
                    <input type="search" name="keyword" placeholder="Search" autocomplete="off">
                    <button class="header-search-btn"><i class="las la-search"></i></button>
                  </form>
                </div>
  
                <div class="schedule-meeting">
                  <img src="assets/images/icon/calendar.png" alt="Calendar">
                  <h1><a href="https://calendly.com/udaya-das" target="_blank">Schedule a meeting</a></h1>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      `;
    }
}

class SpecialHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
           <header id="header" class="fixed-top">
          <div class="container2 d-flex ">
              <!--  logo -->
              <a href="index.html" class="logo mr-auto">
                  <img src="assets/images/logo/logo-utkallabs.png" alt=""></a>
              <!--  nav start-->
              <nav class="nav-menu d-none d-lg-block">
                  <ul class="nav-list">
                      <!-- added a class for active -->
                         <li class="nav-item"><a href="../../index.html">Home</a></li>
                      <li class="nav-item"><a href="../../aboutus.html">About Us</a></li>
                      <li class="nav-item drop-down"><a href="">Services<i class="fas fa-angle-down ml-1 ms-1 pt-1"></i></a>
                          <ul>
                              <li><a href="../../service.html">All Services</a></li>
                               <li><a href="../../services/service-alml-solution/service-alml-solution.html">Al/ML Solution</a></li>
             
                              <li><a href="../../service-qa-services.html">QA Services</a></li>
                               <li><a href="../../service-blockchain-nft.html">Blockchain & NFT</a></li>
                               <li><a href="../../service-devops-consulting.html">Devops Consulting</a></li>
                                  <li><a href="../../service-enterprise-solution.html">Enterprise Solution</a></li>
                              <li><a href="../../service-digital-transformation.html">Digital Transformation</a></li>
                           
                              <li><a href="../../service-web-mobile-application.html">Web & Mobile Application</a></li>
                              <li><a href="../../service-robotic-process-automation.html">Robotic Process Automation</a>
                              </li>
                              
                          </ul>
                      </li>
  
                      <li class="nav-item drop-down">
                          <a href="" class="d-flex align-item-center" >Publications<i class="fas la-angle-down ms-1 pt-1 "></i></a>
                          <ul>
                              <li><a href="portfolio.html">Portfolio</a></li>
                              <li><a href="product.html">Products</a></li>
                              <li><a href="case-studies.html">Case Studies</a></li>
                              <li><a href="our-solutions.html">Our Solutions</a></li>
                              <li><a href="tech-byte.html">Tech Bytes</a></li>
                              <li><a href="monthlyinsights.html">Monthly Insights</a></li>
                          </ul>
                      </li>
                     <li class="nav-item drop-down"><a href="#">Industries<i class="fas la-angle-down ms-1 pt-1 "></i></a>
                          <ul>
                                <li><a href="/industry/ecommerce/ecommerce.html">Ecommerce</a></li>
                                <li><a href="/industry/marketplace/ecommerce-marketplace.html">Ecommerce Marketplace</a></li>
                               <li><a href="/industry/Food-delivery/food-delivery.html">Food Delivery</a></li>
                            <li><a href="/industry/education/education.html">Education</a></li>
                            <li><a href="/industry/fitness/fitness.html">Fitness</a></li>
                                 <li><a href="/industry/videostreaming/index.html">Video Streaming</a></li>
                                <li><a href="/industry/healthcare/healthcare.html">Health Care</a></li>
                            <li><a href="/industry/saas/index.html">SaaS</a></li>
                                <li><a href="/industry/rehabilitation/index.html">Rehabilitation</a></li>
                                <li><a href="/industry/transportation/index.html">Transportation</a></li>
                                <li><a href="/industry/stay-booking/index.html">Stay Booking</a></li>
                          </ul>
                      </li>
  
                      <li class="nav-item"><a href="career.html">Career</a></li>
                      <li class="nav-item"><a href="contact.html">Contact</a></li>
                  </ul>
              </nav>
              <!-- .nav-menu end-->
          </div>
      </header>
          `;
        this.updateActiveNav();
    }

    updateActiveNav() {
        const currentPath = window.location.pathname;
        const navLinks = this.querySelectorAll(".nav-list a");

        navLinks.forEach(link => {
            const href = link.getAttribute("href");

            // Ignore empty, #, or dropdown toggles
            if (!href || href === "#" || href === "") return;

            const linkPath = new URL(href, window.location.origin).pathname;
            const li = link.closest("li");

            // Clear previous state
            li.classList.remove("active");

            // Exact match
            if (currentPath === linkPath) {
                li.classList.add("active");

                // 🔥 Activate parent dropdown (Services / Industries / Publications)
                const parentDropdown = li.closest(".drop-down");
                if (parentDropdown) {
                    parentDropdown.classList.add("active");
                }
            }
        });
    }

}

class SpecialFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
          <footer class="footer-section pt-120">
  
              <div class="waves_left">
                  <img src="/assets/images/footer/bg_left_top.png" class="wave_left" id="wave_left1">
                  <img src="/assets/images/footer/bg_left_top.png" class="wave_left" id="wave_left2">
                  <img src="/assets/images/footer/bg_left_top.png" class="wave_left" id="wave_left3">
                  <img src="/assets/images/footer/bg_left_top.png" class="wave_left" id="wave_left4">
              </div>
              
              <div class="waves_right">
                  <img src="/assets/images/footer/bg_right_bottom.png" class="wave_right" id="wave_right1">
                  <img src="/assets/images/footer/bg_right_bottom.png" class="wave_right" id="wave_right2">
                  <img src="/assets/images/footer/bg_right_bottom.png" class="wave_right" id="wave_right3">
                  <img src="/assets/images/footer/bg_right_bottom.png" class="wave_right" id="wave_right4">
              </div>
              
   
          
          <div class="container">
              <div class="row">
                  <div class="col-xl-3 col-lg-6 col-md-6 order-xl-1 order-lg-1 order-md-1 order-sm-1 order-xs-1 pe-5 ">
                      <div class="footer-widget pr-5">
                          <div class="footer-logo">
                              <a href="index.html">
                                  <img src="assets/images/logo/logo-utkallabs-white.png" alt="site-logo">
  
                              </a>
                          </div>
                          <p>Delivering innovative software solutions with quality, reliability, and continuous growth.</p>
                            <div class="footer-clutch">
                            <div class="clutch-widget"
                                data-url="https://widget.clutch.co"
                                data-widget-type="14"
                                data-height="50"
                                data-nofollow="false"S
                                data-expandifr="true"
                                data-scale="90"
                                data-clutchcompany-id="2050625">
                            </div>
                            </div>
                                    
                                                    <ul class="footer-social">
                              <li class="linkedin"><a href="https://www.linkedin.com/company/utkal-labs" target=”_blank”
                                      class="d-flex justify-content-center align-items-center"><i
                                          class="lab la-linkedin-in"></i></a>
  
                              </li>
                              <li class="facebook"><a href="https://www.facebook.com/utkallabsindia/" target=”_blank”
                                      class="d-flex justify-content-center align-items-center">
                                      <i class='lab la-facebook-f'></i></a>
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
                                      <li><a href="gallery.html">Gallery</a></li>
                                      <li><a href="portfolio.html">Portfolio</a></li>
                                      <li><a href="monthlyinsights.html">Monthly Insights</a></li>
                                      <li><a href="case-studies.html">Case Studies</a></li>
                                  </ul>
                              </div>
                          </div>
                          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6" style="margin-bottom: 40px;">
                              <div class="footer-widget">
                                  <h4 class="title">Quick Links </h4>
                                  <ul class="footer-list">
                                      <li><a href="http://blog.utkallabs.com" target="_blank">Blogs</a></li>
                                      <li><a href="service.html">Services</a></li>
                                      <li><a href="career.html">Career</a></li>
                                      <li><a href="contact.html">Contact</a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div
                      class="col-xl-5 col-lg-6 col-md-12  order-xl-2 order-lg-3 order-md-3 order-sm-3 order-xs-3 img_container_main">
                      <div class="img_container">
                          <img class="img_monuments" src="assets/images/footer/footer_img.png" id="img_monuments">
                          <img src="assets/images/footer/pointer.png" id="pointer_left" alt="">
                          <img src="assets/images/footer/pointer.png" id="pointer_right" alt="">
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
                                  <image id="mask-image" xlink:href="assets/images/footer/footer_img.png" filter="url(#filter)" /> 
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
                          <p><a href="privacypolicy.html" class="text-decoration-none">Privacy Policy</a> |
                              <a href="termsandconditions.html" class="text-decoration-none"> Terms &
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

customElements.define("special-top-header", SpecialTopHeader);
customElements.define("special-header", SpecialHeader);
customElements.define("special-footer", SpecialFooter);
