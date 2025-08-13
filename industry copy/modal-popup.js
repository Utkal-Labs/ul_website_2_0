class SpecialModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `


    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="myModalLabel">Tell Us About Your Project</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="contactForm" method="post">
            <div class="form-group mb-3">
              <label for="name" class="mb-1">Name:</label>
              <input type="text" class="form-control" id="name" name="name" placeholder="Enter Name" maxlength="100"
                required>
            </div>
            <div class="form-group mb-3">
              <label for="email" class="mb-1">Email:</label>
              <input type="email" class="form-control" id="email" name="email" placeholder="Enter Email" maxlength="100"
                required>
            </div>
            <div class="form-group mb-3">
              <label for="phone" class="mb-1">Phone:</label>
              <input type="text" class="form-control" id="phone" name="phone" placeholder="Enter phone number"
                maxlength="14" onkeypress="return /^[0-9+-]+$/i.test(event.key)" required>
            </div>
            <div class="form-group mb-3">
              <label for="message" class="mb-1">What's Your Project About?</label>
              <textarea class="form-control" id="message" name="message" rows="3" placeholder="Tell us a bit about your project needs..."
                maxlength="1000" required></textarea>
            </div>
            <input type="hidden" name="redirectpage" id="" value="1">
            <div class="g-recaptcha mt-3" data-sitekey="6LekdHEpAAAAAN5FrOIsTeUG3G-0SQpYZJqCkB6J"></div>
            <div class="modal-footer pb-0">
              <button type="submit" name="submit" class="btn btn-primary">Send message</button>
            </div>
            <div id="responseMsg" class="mt-2">

            </div>
          </form>


        </div>
      </div>
    </div>
  </div>
        `;
  }
}

customElements.define("special-modal", SpecialModal);

// <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
//   aria-labelledby="staticBackdropLabel" aria-hidden="true">
//   <div class="modal-dialog modal-dialog-centered">
//     <div class="modal-content p-3">
//       <div class="modal-header ">
//         <h5 class="modal-title" id="staticBackdropLabel">Tell Us About Your Project</h5>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//         <form>
//           <div class="form-group">
//             <label for="name" class="mb-1">Name</label>
//             <input type="text" id="name" placeholder="Your Full Name"
//               class="w-100 ecommerce-modal-input p-2 mb-3 rounded">
//           </div>

//           <div class="form-group">
//             <label for="email" class="mb-1">Email</label>
//             <input type="email" id="email" placeholder="Your Email Address"
//               class="w-100 ecommerce-modal-input p-2 mb-3 rounded">
//           </div>

//           <div class="form-group">
//             <label for="phone" class="mb-1">Phone Number</label>
//             <input type="text" id="phone" placeholder="Your Phone Number"
//               class="w-100 ecommerce-modal-input p-2 mb-3 rounded">
//           </div>

//           <div class="form-group">
//             <label for="project" class="mb-1">What's Your Project About?</label>
//             <textarea id="project" placeholder="Tell us a bit about your project needs..."
//               class="w-100 ecommerce-modal-input p-2 mb-3 rounded"></textarea>
//           </div>

//         </form>
//       </div>
//       <div class="modal-footer">
//         <button type="submit" class="get-start-btn text-white px-5 py-2">Get Started</button>

//       </div>
//     </div>
//   </div>
// </div>
