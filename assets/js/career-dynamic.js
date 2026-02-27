/**
 * Career Page Dynamic Content Handler
 * Handles fetching open positions and application submissions
 */

$(document).ready(function () {
  // const BASE_URL = "http://20.244.84.8:8071";
  const BASE_URL = "http://20.40.46.189";

  /**
   * Fetch open positions from the API
   */
  function fetchOpenPositions() {
    $.ajax({
      url: `${BASE_URL}/recruitment/api/open-recruitments/`,
      method: "GET",
      success: function (response) {
        console.log("Fetched positions:", response);
        displayPositions(response.recruitments);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching positions:", error);
        console.error("Status:", status);
        console.error("Response:", xhr.responseText);
        showNoPositions();
      },
    });
  }

  /**
   * Display positions in the UI
   */
  function displayPositions(recruitments) {
    const $loading = $("#positions-loading");
    const $noPositions = $("#no-positions");
    const $jobListings = $("#job-listings");

    $loading.hide();

    if (!recruitments || recruitments.length === 0) {
      showNoPositions();
      return;
    }

    // Filter for published and open positions
    const openPositions = recruitments.filter(
      (recruitment) => recruitment.is_published && !recruitment.closed
    );

    if (openPositions.length === 0) {
      showNoPositions();
      return;
    }

    let jobCardsHtml = "";
    openPositions.forEach(function (recruitment) {
      jobCardsHtml += createJobCard(recruitment);
    });

    $jobListings.html(jobCardsHtml).show();
  }

  /**
   * Show no positions message
   */
  function showNoPositions() {
    $("#positions-loading").hide();
    $("#no-positions").show();
    $("#job-listings").hide();
  }

  /**
   * Create individual job card HTML
   */
  function createJobCard(recruitment) {
    const endDate = new Date(recruitment.end_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const skills =
      recruitment.skills && recruitment.skills.length > 0
        ? recruitment.skills.join(", ")
        : "Not specified";

    const shortDescription =
      recruitment.description.length > 150
        ? recruitment.description.substring(0, 150) + "..."
        : recruitment.description;

    // Get the first open position or create a fallback
    const firstPosition =
      recruitment.open_positions && recruitment.open_positions.length > 0
        ? recruitment.open_positions[0]
        : { id: "", job_position: "General Application" };

    // Calculate days until deadline
    const today = new Date();
    const deadline = new Date(recruitment.end_date);
    const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    const urgencyClass =
      daysLeft <= 7 ? "urgent" : daysLeft <= 14 ? "moderate" : "normal";

    const isExpired = daysLeft <= 0;

    return `
            <div class="col-lg-6 col-xl-4 col-md-6 mb-4">
                <div class="job-card" data-recruitment='${JSON.stringify(
                  recruitment
                ).replace(/'/g, "&apos;")}'>
                    <div class="job-card-header">
                        <div class="job-title-section">
                            <h4 class="job-title">${escapeHtml(
                              recruitment.title
                            )}</h4>
                            <span class="company-name">${escapeHtml(
                              recruitment.company
                            )}</span>
                        </div>
                        <div class="job-badges">
                            <span class="vacancy-badge">${
                              recruitment.vacancy
                            } ${recruitment.vacancy > 1 ? "Positions" : "Position"}</span>
                            <span class="deadline-badge ${urgencyClass}">
                                ${
                                  daysLeft > 0
                                    ? `${daysLeft} days left`
                                    : "Expired"
                                }
                            </span>
                        </div>
                    </div>
                    
                    <div class="job-card-body">
                        <div class="job-description-preview">
                            <p>${escapeHtml(shortDescription)}</p>
                        </div>
                        
                        <div class="job-skills">
                            <div class="skills-label">Required Skills:</div>
                            <div class="skills-tags">
                                ${
                                  recruitment.skills &&
                                  recruitment.skills.length > 0
                                    ? recruitment.skills
                                        .slice(0, 3)
                                        .map(
                                          (skill) =>
                                            `<span class="skill-tag">${escapeHtml(
                                              skill
                                            )}</span>`
                                        )
                                        .join("")
                                    : '<span class="skill-tag no-skills">Not specified</span>'
                                }
                                ${
                                  recruitment.skills &&
                                  recruitment.skills.length > 3
                                    ? `<span class="skill-tag more-skills">+${
                                        recruitment.skills.length - 3
                                      } more</span>`
                                    : ""
                                }
                            </div>
                        </div>

                        <div class="job-timeline">
                            <div class="timeline-item">
                                <i class="las la-calendar"></i>
                                <span>Deadline: ${endDate}</span>
                            </div>
                            <div class="timeline-item">
                                <i class="las la-clock"></i>
                                <span>Posted: ${new Date(
                                  recruitment.created_at
                                ).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="job-card-footer">
                        <button class="btn btn-outline view-details-btn" 
                                data-recruitment-id="${recruitment.id}">
                            <i class="las la-eye"></i> View Details
                        </button>
                        <button class="btn btn-primary apply-btn ${
                          isExpired ? "disabled" : ""
                        }" 
                                data-recruitment-id="${recruitment.id}"
                                data-job-position-id="${firstPosition.id}"
                                data-job-title="${escapeHtml(
                                  recruitment.title
                                )}"
                                data-optional-resume="${
                                  recruitment.optional_resume
                                }"
                                ${isExpired ? "disabled" : ""}>
                            <i class="las la-paper-plane"></i> ${
                              isExpired ? "Expired" : "Apply Now"
                            }
                        </button>
                    </div>
                </div>
            </div>
        `;
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, function (m) {
      return map[m];
    });
  }

  /**
   * Handle view details button clicks
   */
  $(document).on("click", ".view-details-btn", function () {
    const recruitmentId = $(this).data("recruitment-id");
    const recruitmentData = $(this).closest(".job-card").data("recruitment");

    if (recruitmentData) {
      showJobDetails(recruitmentData);
    }
  });

  /**
   * Show job details in modal
   */
  function showJobDetails(recruitment) {
    const endDate = new Date(recruitment.end_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const startDate = new Date(recruitment.start_date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    const skills =
      recruitment.skills && recruitment.skills.length > 0
        ? recruitment.skills.join(", ")
        : "Not specified";

    // Format description with line breaks
    const formattedDescription = recruitment.description.replace(/\n/g, "<br>");

    // Check if position is expired
    const today = new Date();
    const deadline = new Date(recruitment.end_date);
    const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    const isExpired = daysLeft <= 0;

    const modalContent = `
       <div class="job-details-content">
         <div class="job-details-header">
           <div class="company-name-modal">
             <i class="las la-building"></i>
             <span>${escapeHtml(recruitment.company)}</span>
           </div>
           <div class="job-status-info">
             <span class="vacancy-info">${recruitment.vacancy} Position${
      recruitment.vacancy > 1 ? "s" : ""
    } Available</span>
             <span class="status-badge ${
               recruitment.closed ? "closed" : "open"
             }">
               ${recruitment.closed ? "Closed" : "Open"}
             </span>
           </div>
         </div>

         <div class="job-details-body">
           <div class="detail-section">
             <h5><i class="las la-info-circle"></i> Job Description</h5>
             <div class="description-content">${formattedDescription}</div>
           </div>

           <div class="detail-section">
             <h5><i class="las la-tools"></i> Required Skills</h5>
             <div class="skills-list">
               ${
                 recruitment.skills && recruitment.skills.length > 0
                   ? recruitment.skills
                       .map(
                         (skill) =>
                           `<span class="skill-badge">${escapeHtml(
                             skill
                           )}</span>`
                       )
                       .join("")
                   : '<span class="no-skills-text">No specific skills mentioned</span>'
               }
             </div>
           </div>

           <div class="detail-section">
             <h5><i class="las la-calendar-alt"></i> Application Timeline</h5>
             <div class="timeline-info">
               <div class="timeline-row">
                 <span class="timeline-label">Application Opens:</span>
                 <span class="timeline-value">${startDate}</span>
               </div>
               <div class="timeline-row">
                 <span class="timeline-label">Application Deadline:</span>
                 <span class="timeline-value">${endDate}</span>
               </div>
               <div class="timeline-row">
                 <span class="timeline-label">Posted On:</span>
                 <span class="timeline-value">${new Date(
                   recruitment.created_at
                 ).toLocaleDateString()}</span>
               </div>
             </div>
           </div>

           ${
             recruitment.open_positions && recruitment.open_positions.length > 0
               ? `
           <div class="detail-section">
             <h5><i class="las la-briefcase"></i> Available Positions</h5>
             <div class="positions-list">
               ${recruitment.open_positions
                 .map(
                   (position) =>
                     `<span class="position-badge">${escapeHtml(
                       position.job_position
                     )}</span>`
                 )
                 .join("")}
             </div>
           </div>
           `
               : ""
           }
         </div>

         <div class="job-details-footer">
           <button class="btn btn-secondary" data-dismiss="modal">Close</button>
           <button class="btn btn-primary apply-from-details ${
             recruitment.closed || isExpired ? "disabled" : ""
           }" 
                   data-recruitment-id="${recruitment.id}"
                   data-job-position-id="${
                     recruitment.open_positions[0]?.id || ""
                   }"
                   data-job-title="${escapeHtml(recruitment.title)}"
                   data-optional-resume="${recruitment.optional_resume}"
                   ${recruitment.closed || isExpired ? "disabled" : ""}>
             <i class="las la-paper-plane"></i> 
             ${
               recruitment.closed
                 ? "Position Closed"
                 : isExpired
                 ? "Position Expired"
                 : "Apply for this Position"
             }
           </button>
         </div>
       </div>
     `;

    // Set modal content
    $("#jobDetailsModalLabel").text(recruitment.title);
    $("#jobDetailsModal .modal-body").html(modalContent);
    $("#jobDetailsModal").modal("show");
  }

  /**
   * Handle apply button clicks from details modal
   */
  $(document).on("click", ".apply-from-details", function () {
    // Check if button is disabled
    if ($(this).hasClass("disabled") || $(this).is(":disabled")) {
      return false;
    }

    $("#jobDetailsModal").modal("hide");

    // Trigger the application modal with the same data
    const recruitmentId = $(this).data("recruitment-id");
    const jobPositionId = $(this).data("job-position-id");
    const jobTitle = $(this).data("job-title");
    const optionalResume = $(this).data("optional-resume");

    // Set modal data
    $("#modal-recruitment-id").val(recruitmentId);
    $("#modal-job-position-id").val(jobPositionId);
    $("#applicationModalLabel").text(`Apply for ${jobTitle}`);

    // Handle optional fields based on API response
    const $resumeField = $("#modal-resume");

    if (optionalResume) {
      $resumeField.prop("required", false);
      $resumeField
        .siblings("small")
        .text("Upload PDF, DOC, or DOCX file (Optional)");
    } else {
      $resumeField.prop("required", true);
      $resumeField
        .siblings("small")
        .text("Upload PDF, DOC, or DOCX file (Required)");
    }

    // Show application modal
    $("#applicationModal").modal("show");
  });

  /**
   * Handle apply button clicks
   */
  $(document).on("click", ".apply-btn", function () {
    // Check if button is disabled
    if ($(this).hasClass("disabled") || $(this).is(":disabled")) {
      return false;
    }

    const recruitmentId = $(this).data("recruitment-id");
    const jobPositionId = $(this).data("job-position-id");
    const jobTitle = $(this).data("job-title");
    const optionalResume = $(this).data("optional-resume");

    // Set modal data
    $("#modal-recruitment-id").val(recruitmentId);
    $("#modal-job-position-id").val(jobPositionId);
    $("#applicationModalLabel").text(`Apply for ${jobTitle}`);

    // Handle optional fields based on API response
    const $resumeField = $("#modal-resume");

    if (optionalResume) {
      $resumeField.prop("required", false);
      $resumeField
        .siblings("small")
        .text("Upload PDF, DOC, or DOCX file (Optional)");
    } else {
      $resumeField.prop("required", true);
      $resumeField
        .siblings("small")
        .text("Upload PDF, DOC, or DOCX file (Required)");
    }

    // Show modal
    $("#applicationModal").modal("show");
  });

  /**
   * Handle form submission
   */
  $("#submitApplication").click(function () {
    const form = document.getElementById("applicationForm");
    const formData = new FormData(form);

    // Validate required fields
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Additional validation for file uploads
    const resumeRequired = $("#modal-resume").prop("required");
    const resumeFile = $("#modal-resume")[0].files[0];

    if (resumeRequired && !resumeFile) {
      alert("Please upload your resume.");
      return;
    }

    // Show loading state
    const $submitBtn = $(this);
    const originalText = $submitBtn.text();
    $submitBtn.text("Submitting...").prop("disabled", true);

    // Submit application
    $.ajax({
      url: `${BASE_URL}/recruitment/api/apply/`,
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        console.log("Application submitted successfully:", response);

        // Success handling
        alert("Application submitted successfully!");
        $("#applicationModal").modal("hide");
        form.reset();
      },
      error: function (xhr, status, error) {
        console.error("Error submitting application:", error);
        console.error("Status:", status);
        console.error("Response:", xhr.responseText);

        let errorMessage =
          "An error occurred while submitting your application. Please try again.";

        // Try to get more specific error message from API response
        if (xhr.responseJSON) {
          if (xhr.responseJSON.message) {
            errorMessage = xhr.responseJSON.message;
          } else if (xhr.responseJSON.error) {
            errorMessage = xhr.responseJSON.error;
          }
        }

        alert(errorMessage);
      },
      complete: function () {
        // Reset button state
        $submitBtn.text(originalText).prop("disabled", false);
      },
    });
  });

  /**
   * Reset modal form when closed
   */
  $("#applicationModal").on("hidden.bs.modal", function () {
    const form = document.getElementById("applicationForm");
    form.reset();

    // Reset any dynamic field requirements
    $("#modal-resume").prop("required", true);
  });

  /**
   * File upload validation
   */
  $("#modal-resume").change(function () {
    const file = this.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a valid resume file (PDF, DOC, or DOCX).");
        this.value = "";
        return;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("Resume file size should be less than 5MB.");
        this.value = "";
        return;
      }
    }
  });

  /**
   * Portfolio URL validation
   */
  $("#modal-portfolio").on("blur", function () {
    const url = $(this).val().trim();
    if (url && !isValidURL(url)) {
      alert(
        "Please enter a valid URL (e.g., https://example.com, www.example.com, or example.com)"
      );
      $(this).focus();
    }
  });

  function isValidURL(string) {
    if (!string) return true;

    // Add protocol if missing
    let url = string;
    if (!url.match(/^https?:\/\//)) {
      url = "http://" + url;
    }

    try {
      new URL(url);
      return true;
    } catch (_) {
      const pattern =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      return pattern.test(string);
    }
  }

  // Initialize: Fetch positions on page load
  fetchOpenPositions();
});
