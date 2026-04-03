document.addEventListener("DOMContentLoaded", () => {

  /* ---------- SWIPER ---------- */
  if (document.querySelector(".popular-swiper")) {
    new Swiper(".popular-swiper", {
      loop: true,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  /* ---------- LIST.JS ---------- */
  
  if (document.getElementById("resourcesList")) {
    const options = { valueNames: ["name", "title"], listClass: "card-list" };
    const resourceList = new List("resourcesList", options);

    // Filter state
    let activeCategory = "all";
    let activeCounty = "all";

    // Unified filter function
    function applyFilters() {
      resourceList.filter(item => {
        const matchesCategory = activeCategory === "all" || item.elm.dataset.category === activeCategory;
        const matchesCounty = activeCounty === "all" || item.elm.dataset.county === activeCounty;
        return matchesCategory && matchesCounty;
      });
    }

    // Category buttons
    document.querySelectorAll("#filterButtons .filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.filter;
        document.querySelectorAll("#filterButtons .filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        applyFilters();
      });
    });

    // County buttons
    items.forEach(item => {
      item.addEventListener('click', () => {
        selected.innerHTML = `${item.textContent} <span class="dropdown-arrow">▼</span>`;
          dropdown.classList.remove('open');

    // Update the activeCounty and apply filter
    activeCounty = item.dataset.value === "all" ? "all" : item.dataset.value + " County";
    applyFilters();
  });
});


  }



  /* ---------- FORM MESSAGE ---------- */
  const form = document.getElementById("resourceForm");
  const message = document.getElementById("message");

  if (form && message) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      message.textContent = "Successfully received ✅";
      message.style.display = "block";
      form.reset();
    });

    form.addEventListener("input", () => {
      message.style.display = "none";
    });
  }

});

// JS to handle the dropdown
const dropdown = document.querySelector('.dropdown-wrapper');
const selected = dropdown.querySelector('.selected');
const list = dropdown.querySelector('.dropdown-list');
const items = dropdown.querySelectorAll('.dropdown-item');

selected.addEventListener('click', () => {
  dropdown.classList.toggle('open');
});

// Close dropdown if clicked outside
document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});

// Update selected value
items.forEach(item => {
  item.addEventListener('click', () => {
    selected.innerHTML = `${item.textContent} <span class="dropdown-arrow">▼</span>`;
    dropdown.classList.remove('open');
  });
});
