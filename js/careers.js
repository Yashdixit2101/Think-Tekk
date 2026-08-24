/****************************************************
 * THINKTEKK CAREERS
 *
 * Google Sheets
 *      ↓
 * Apps Script API
 *      ↓
 * careers.js
 *      ↓
 * Career Cards
 ****************************************************/


(function () {


  // =================================================
  // CONFIGURATION
  // =================================================

  const API_URL =
    "https://script.google.com/macros/s/AKfycbwYIuHICy3tO-rWKL0wzdflMZzRlzAbb-uYFfLOkftVUP5C39iY5f14ZL3mVMfLfeasdA/exec";


  // =================================================
  // GET CAREERS CONTAINER
  // =================================================

  const careersGrid =
    document.getElementById(
      "careersGrid"
    );


  // Stop if Careers section doesn't exist
  if (!careersGrid) {

    console.warn(
      "careersGrid element was not found."
    );

    return;

  }


  // =================================================
  // LOAD CAREERS
  // =================================================

  async function loadCareers() {


    // Show loading state

    careersGrid.innerHTML = `

      <p class="careers-loading">

        Loading current openings...

      </p>

    `;


    try {


      // ---------------------------------------------
      // Request API
      // ---------------------------------------------

      const response =
        await fetch(API_URL);


      // ---------------------------------------------
      // Check HTTP response
      // ---------------------------------------------

      if (!response.ok) {

        throw new Error(
          `HTTP error: ${response.status}`
        );

      }


      // ---------------------------------------------
      // Convert response to JSON
      // ---------------------------------------------

      const data =
        await response.json();


      console.log(
        "Careers API:",
        data
      );


      // ---------------------------------------------
      // Check API error
      // ---------------------------------------------

      if (
        !Array.isArray(data)
      ) {

        throw new Error(
          data.error ||
          "Invalid API response."
        );

      }


      // ---------------------------------------------
      // Only show OPEN jobs
      // ---------------------------------------------

      const openJobs =
        data.filter(job => {

          return String(
            job.status || ""
          )
            .trim()
            .toLowerCase() === "open";

        });


      console.log(
        "Open positions:",
        openJobs
      );


      // ---------------------------------------------
      // No current openings
      // ---------------------------------------------

      if (
        openJobs.length === 0
      ) {

        showNoOpenings();

        return;

      }


      // ---------------------------------------------
      // Clear loading
      // ---------------------------------------------

      careersGrid.innerHTML = "";


      // ---------------------------------------------
      // Render each job
      // ---------------------------------------------

      openJobs.forEach(
        (job, index) => {

          createCareerCard(
            job,
            index
          );

        }
      );


    } catch (error) {


      // ---------------------------------------------
      // Log error
      // ---------------------------------------------

      console.error(
        "Careers loading error:",
        error
      );


      // ---------------------------------------------
      // Show error
      // ---------------------------------------------

      showCareerError(
        error.message
      );

    }

  }


  // =================================================
  // CREATE CAREER CARD
  // =================================================

  function createCareerCard(
    job,
    index
  ) {


    // Create card

    const card =
      document.createElement(
        "article"
      );


    card.className =
      "career-card fade-in";


    // ---------------------------------------------
    // Skills
    // ---------------------------------------------

    const skills =
      String(
        job.skills || ""
      )

        .split(",")

        .map(
          skill =>
            skill.trim()
        )

        .filter(Boolean);


    const skillsHTML =
      skills

        .map(
          skill => `

            <span class="skill-tag">

              ${escapeHTML(skill)}

            </span>

          `
        )

        .join("");


    // ---------------------------------------------
    // Google Form URL
    // ---------------------------------------------

    const formURL =
      String(
        job.googleForm || ""
      ).trim();


    // ---------------------------------------------
    // Apply button
    // ---------------------------------------------

    let applyButton = "";


    if (formURL) {

      applyButton = `

        <a

          href="${escapeAttribute(formURL)}"

          target="_blank"

          rel="noopener noreferrer"

          class="apply-btn"

        >

          Apply Now →

        </a>

      `;

    } else {

      applyButton = `

        <span class="apply-btn">

          Application Unavailable

        </span>

      `;

    }


    // ---------------------------------------------
    // Create HTML
    // ---------------------------------------------

    card.innerHTML = `

      <div class="career-card-header">


        <div>

          <p class="career-department">

            ${escapeHTML(
              job.department || ""
            )}

          </p>


          <h3>

            ${escapeHTML(
              job.title ||
              "Untitled Position"
            )}

          </h3>

        </div>


        <span class="career-type">

          ${escapeHTML(
            job.type || ""
          )}

        </span>


      </div>


      <div class="career-meta">


        ${
          job.location
            ? `

              <span>

                📍

                ${escapeHTML(
                  job.location
                )}

              </span>

            `
            : ""
        }


        ${
          job.experience
            ? `

              <span>

                💼

                ${escapeHTML(
                  job.experience
                )}

              </span>

            `
            : ""
        }


        ${
          job.salary
            ? `

              <span>

                💰

                ${escapeHTML(
                  job.salary
                )}

              </span>

            `
            : ""
        }


      </div>


      <p class="career-description">

        ${escapeHTML(
          job.description || ""
        )}

      </p>


      ${
        skillsHTML
          ? `

            <div class="career-skills">

              ${skillsHTML}

            </div>

          `
          : ""
      }


      ${applyButton}


    `;


    // ---------------------------------------------
    // Add card to page
    // ---------------------------------------------

    careersGrid.appendChild(
      card
    );


    // ---------------------------------------------
    // Trigger fade-in animation
    // ---------------------------------------------

    setTimeout(
      () => {

        card.classList.add(
          "visible"
        );

      },
      index * 100
    );

  }


  // =================================================
  // NO OPENINGS
  // =================================================

  function showNoOpenings() {

    careersGrid.innerHTML = `

      <div class="no-careers">

        <h3>

          No Current Openings

        </h3>


        <p>

          We don't have any open
          positions at the moment.

        </p>


        <p>

          Please check back soon!

        </p>

      </div>

    `;

  }


  // =================================================
  // API ERROR
  // =================================================

  function showCareerError(
    message
  ) {

    careersGrid.innerHTML = `

      <div class="careers-error">

        <h3>

          Unable to load current openings

        </h3>


        <p>

          Please try again later.

        </p>

      </div>

    `;

  }


  // =================================================
  // HTML ESCAPING
  // Prevents HTML injection from Sheet data
  // =================================================

  function escapeHTML(
    value
  ) {

    return String(value)

      .replace(
        /&/g,
        "&amp;"
      )

      .replace(
        /</g,
        "&lt;"
      )

      .replace(
        />/g,
        "&gt;"
      )

      .replace(
        /"/g,
        "&quot;"
      )

      .replace(
        /'/g,
        "&#039;"
      );

  }


  // =================================================
  // ATTRIBUTE ESCAPING
  // =================================================

  function escapeAttribute(
    value
  ) {

    return String(value)

      .replace(
        /&/g,
        "&amp;"
      )

      .replace(
        /"/g,
        "&quot;"
      )

      .replace(
        /</g,
        "&lt;"
      )

      .replace(
        />/g,
        "&gt;"
      );

  }


  // =================================================
  // START
  // =================================================

  loadCareers();


})();/****************************************************
 * THINKTEKK CAREERS
 *
 * Google Sheets
 *      ↓
 * Apps Script API
 *      ↓
 * careers.js
 *      ↓
 * Career Cards
 ****************************************************/


(function () {


  // =================================================
  // CONFIGURATION
  // =================================================

  const API_URL =
    "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";


  // =================================================
  // GET CAREERS CONTAINER
  // =================================================

  const careersGrid =
    document.getElementById(
      "careersGrid"
    );


  // Stop if Careers section doesn't exist
  if (!careersGrid) {

    console.warn(
      "careersGrid element was not found."
    );

    return;

  }


  // =================================================
  // LOAD CAREERS
  // =================================================

  async function loadCareers() {


    // Show loading state

    careersGrid.innerHTML = `

      <p class="careers-loading">

        Loading current openings...

      </p>

    `;


    try {


      // ---------------------------------------------
      // Request API
      // ---------------------------------------------

      const response =
        await fetch(API_URL);


      // ---------------------------------------------
      // Check HTTP response
      // ---------------------------------------------

      if (!response.ok) {

        throw new Error(
          `HTTP error: ${response.status}`
        );

      }


      // ---------------------------------------------
      // Convert response to JSON
      // ---------------------------------------------

      const data =
        await response.json();


      console.log(
        "Careers API:",
        data
      );


      // ---------------------------------------------
      // Check API error
      // ---------------------------------------------

      if (
        !Array.isArray(data)
      ) {

        throw new Error(
          data.error ||
          "Invalid API response."
        );

      }


      // ---------------------------------------------
      // Only show OPEN jobs
      // ---------------------------------------------

      const openJobs =
        data.filter(job => {

          return String(
            job.status || ""
          )
            .trim()
            .toLowerCase() === "open";

        });


      console.log(
        "Open positions:",
        openJobs
      );


      // ---------------------------------------------
      // No current openings
      // ---------------------------------------------

      if (
        openJobs.length === 0
      ) {

        showNoOpenings();

        return;

      }


      // ---------------------------------------------
      // Clear loading
      // ---------------------------------------------

      careersGrid.innerHTML = "";


      // ---------------------------------------------
      // Render each job
      // ---------------------------------------------

      openJobs.forEach(
        (job, index) => {

          createCareerCard(
            job,
            index
          );

        }
      );


    } catch (error) {


      // ---------------------------------------------
      // Log error
      // ---------------------------------------------

      console.error(
        "Careers loading error:",
        error
      );


      // ---------------------------------------------
      // Show error
      // ---------------------------------------------

      showCareerError(
        error.message
      );

    }

  }


  // =================================================
  // CREATE CAREER CARD
  // =================================================

  function createCareerCard(
    job,
    index
  ) {


    // Create card

    const card =
      document.createElement(
        "article"
      );


    card.className =
      "career-card fade-in";


    // ---------------------------------------------
    // Skills
    // ---------------------------------------------

    const skills =
      String(
        job.skills || ""
      )

        .split(",")

        .map(
          skill =>
            skill.trim()
        )

        .filter(Boolean);


    const skillsHTML =
      skills

        .map(
          skill => `

            <span class="skill-tag">

              ${escapeHTML(skill)}

            </span>

          `
        )

        .join("");


    // ---------------------------------------------
    // Google Form URL
    // ---------------------------------------------

    const formURL =
      String(
        job.googleForm || ""
      ).trim();


    // ---------------------------------------------
    // Apply button
    // ---------------------------------------------

    let applyButton = "";


    if (formURL) {

      applyButton = `

        <a

          href="${escapeAttribute(formURL)}"

          target="_blank"

          rel="noopener noreferrer"

          class="apply-btn"

        >

          Apply Now →

        </a>

      `;

    } else {

      applyButton = `

        <span class="apply-btn">

          Application Unavailable

        </span>

      `;

    }


    // ---------------------------------------------
    // Create HTML
    // ---------------------------------------------

    card.innerHTML = `

      <div class="career-card-header">


        <div>

          <p class="career-department">

            ${escapeHTML(
              job.department || ""
            )}

          </p>


          <h3>

            ${escapeHTML(
              job.title ||
              "Untitled Position"
            )}

          </h3>

        </div>


        <span class="career-type">

          ${escapeHTML(
            job.type || ""
          )}

        </span>


      </div>


      <div class="career-meta">


        ${
          job.location
            ? `

              <span>

                📍

                ${escapeHTML(
                  job.location
                )}

              </span>

            `
            : ""
        }


        ${
          job.experience
            ? `

              <span>

                💼

                ${escapeHTML(
                  job.experience
                )}

              </span>

            `
            : ""
        }


        ${
          job.salary
            ? `

              <span>

                💰

                ${escapeHTML(
                  job.salary
                )}

              </span>

            `
            : ""
        }


      </div>


      <p class="career-description">

        ${escapeHTML(
          job.description || ""
        )}

      </p>


      ${
        skillsHTML
          ? `

            <div class="career-skills">

              ${skillsHTML}

            </div>

          `
          : ""
      }


      ${applyButton}


    `;


    // ---------------------------------------------
    // Add card to page
    // ---------------------------------------------

    careersGrid.appendChild(
      card
    );


    // ---------------------------------------------
    // Trigger fade-in animation
    // ---------------------------------------------

    setTimeout(
      () => {

        card.classList.add(
          "visible"
        );

      },
      index * 100
    );

  }


  // =================================================
  // NO OPENINGS
  // =================================================

  function showNoOpenings() {

    careersGrid.innerHTML = `

      <div class="no-careers">

        <h3>

          No Current Openings

        </h3>


        <p>

          We don't have any open
          positions at the moment.

        </p>


        <p>

          Please check back soon!

        </p>

      </div>

    `;

  }


  // =================================================
  // API ERROR
  // =================================================

  function showCareerError(
    message
  ) {

    careersGrid.innerHTML = `

      <div class="careers-error">

        <h3>

          Unable to load current openings

        </h3>


        <p>

          Please try again later.

        </p>

      </div>

    `;

  }


  // =================================================
  // HTML ESCAPING
  // Prevents HTML injection from Sheet data
  // =================================================

  function escapeHTML(
    value
  ) {

    return String(value)

      .replace(
        /&/g,
        "&amp;"
      )

      .replace(
        /</g,
        "&lt;"
      )

      .replace(
        />/g,
        "&gt;"
      )

      .replace(
        /"/g,
        "&quot;"
      )

      .replace(
        /'/g,
        "&#039;"
      );

  }


  // =================================================
  // ATTRIBUTE ESCAPING
  // =================================================

  function escapeAttribute(
    value
  ) {

    return String(value)

      .replace(
        /&/g,
        "&amp;"
      )

      .replace(
        /"/g,
        "&quot;"
      )

      .replace(
        /</g,
        "&lt;"
      )

      .replace(
        />/g,
        "&gt;"
      );

  }


  // =================================================
  // START
  // =================================================

  loadCareers();


})();/****************************************************
 * THINKTEKK CAREERS
 *
 * Google Sheets
 *      ↓
 * Apps Script API
 *      ↓
 * careers.js
 *      ↓
 * Career Cards
 ****************************************************/


(function () {


  // =================================================
  // CONFIGURATION
  // =================================================

  const API_URL =
    "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";


  // =================================================
  // GET CAREERS CONTAINER
  // =================================================

  const careersGrid =
    document.getElementById(
      "careersGrid"
    );


  // Stop if Careers section doesn't exist
  if (!careersGrid) {

    console.warn(
      "careersGrid element was not found."
    );

    return;

  }


  // =================================================
  // LOAD CAREERS
  // =================================================

  async function loadCareers() {


    // Show loading state

    careersGrid.innerHTML = `

      <p class="careers-loading">

        Loading current openings...

      </p>

    `;


    try {


      // ---------------------------------------------
      // Request API
      // ---------------------------------------------

      const response =
        await fetch(API_URL);


      // ---------------------------------------------
      // Check HTTP response
      // ---------------------------------------------

      if (!response.ok) {

        throw new Error(
          `HTTP error: ${response.status}`
        );

      }


      // ---------------------------------------------
      // Convert response to JSON
      // ---------------------------------------------

      const data =
        await response.json();


      console.log(
        "Careers API:",
        data
      );


      // ---------------------------------------------
      // Check API error
      // ---------------------------------------------

      if (
        !Array.isArray(data)
      ) {

        throw new Error(
          data.error ||
          "Invalid API response."
        );

      }


      // ---------------------------------------------
      // Only show OPEN jobs
      // ---------------------------------------------

      const openJobs =
        data.filter(job => {

          return String(
            job.status || ""
          )
            .trim()
            .toLowerCase() === "open";

        });


      console.log(
        "Open positions:",
        openJobs
      );


      // ---------------------------------------------
      // No current openings
      // ---------------------------------------------

      if (
        openJobs.length === 0
      ) {

        showNoOpenings();

        return;

      }


      // ---------------------------------------------
      // Clear loading
      // ---------------------------------------------

      careersGrid.innerHTML = "";


      // ---------------------------------------------
      // Render each job
      // ---------------------------------------------

      openJobs.forEach(
        (job, index) => {

          createCareerCard(
            job,
            index
          );

        }
      );


    } catch (error) {


      // ---------------------------------------------
      // Log error
      // ---------------------------------------------

      console.error(
        "Careers loading error:",
        error
      );


      // ---------------------------------------------
      // Show error
      // ---------------------------------------------

      showCareerError(
        error.message
      );

    }

  }


  // =================================================
  // CREATE CAREER CARD
  // =================================================

  function createCareerCard(
    job,
    index
  ) {


    // Create card

    const card =
      document.createElement(
        "article"
      );


    card.className =
      "career-card fade-in";


    // ---------------------------------------------
    // Skills
    // ---------------------------------------------

    const skills =
      String(
        job.skills || ""
      )

        .split(",")

        .map(
          skill =>
            skill.trim()
        )

        .filter(Boolean);


    const skillsHTML =
      skills

        .map(
          skill => `

            <span class="skill-tag">

              ${escapeHTML(skill)}

            </span>

          `
        )

        .join("");


    // ---------------------------------------------
    // Google Form URL
    // ---------------------------------------------

    const formURL =
      String(
        job.googleForm || ""
      ).trim();


    // ---------------------------------------------
    // Apply button
    // ---------------------------------------------

    let applyButton = "";


    if (formURL) {

      applyButton = `

        <a

          href="${escapeAttribute(formURL)}"

          target="_blank"

          rel="noopener noreferrer"

          class="apply-btn"

        >

          Apply Now →

        </a>

      `;

    } else {

      applyButton = `

        <span class="apply-btn">

          Application Unavailable

        </span>

      `;

    }


    // ---------------------------------------------
    // Create HTML
    // ---------------------------------------------

    card.innerHTML = `

      <div class="career-card-header">


        <div>

          <p class="career-department">

            ${escapeHTML(
              job.department || ""
            )}

          </p>


          <h3>

            ${escapeHTML(
              job.title ||
              "Untitled Position"
            )}

          </h3>

        </div>


        <span class="career-type">

          ${escapeHTML(
            job.type || ""
          )}

        </span>


      </div>


      <div class="career-meta">


        ${
          job.location
            ? `

              <span>

                📍

                ${escapeHTML(
                  job.location
                )}

              </span>

            `
            : ""
        }


        ${
          job.experience
            ? `

              <span>

                💼

                ${escapeHTML(
                  job.experience
                )}

              </span>

            `
            : ""
        }


        ${
          job.salary
            ? `

              <span>

                💰

                ${escapeHTML(
                  job.salary
                )}

              </span>

            `
            : ""
        }


      </div>


      <p class="career-description">

        ${escapeHTML(
          job.description || ""
        )}

      </p>


      ${
        skillsHTML
          ? `

            <div class="career-skills">

              ${skillsHTML}

            </div>

          `
          : ""
      }


      ${applyButton}


    `;


    // ---------------------------------------------
    // Add card to page
    // ---------------------------------------------

    careersGrid.appendChild(
      card
    );


    // ---------------------------------------------
    // Trigger fade-in animation
    // ---------------------------------------------

    setTimeout(
      () => {

        card.classList.add(
          "visible"
        );

      },
      index * 100
    );

  }


  // =================================================
  // NO OPENINGS
  // =================================================

  function showNoOpenings() {

    careersGrid.innerHTML = `

      <div class="no-careers">

        <h3>

          No Current Openings

        </h3>


        <p>

          We don't have any open
          positions at the moment.

        </p>


        <p>

          Please check back soon!

        </p>

      </div>

    `;

  }


  // =================================================
  // API ERROR
  // =================================================

  function showCareerError(
    message
  ) {

    careersGrid.innerHTML = `

      <div class="careers-error">

        <h3>

          Unable to load current openings

        </h3>


        <p>

          Please try again later.

        </p>

      </div>

    `;

  }


  // =================================================
  // HTML ESCAPING
  // Prevents HTML injection from Sheet data
  // =================================================

  function escapeHTML(
    value
  ) {

    return String(value)

      .replace(
        /&/g,
        "&amp;"
      )

      .replace(
        /</g,
        "&lt;"
      )

      .replace(
        />/g,
        "&gt;"
      )

      .replace(
        /"/g,
        "&quot;"
      )

      .replace(
        /'/g,
        "&#039;"
      );

  }


  // =================================================
  // ATTRIBUTE ESCAPING
  // =================================================

  function escapeAttribute(
    value
  ) {

    return String(value)

      .replace(
        /&/g,
        "&amp;"
      )

      .replace(
        /"/g,
        "&quot;"
      )

      .replace(
        /</g,
        "&lt;"
      )

      .replace(
        />/g,
        "&gt;"
      );

  }


  // =================================================
  // START
  // =================================================

  loadCareers();


})();