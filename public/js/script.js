(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()



document.addEventListener("DOMContentLoaded", function () {
    // Initialize Bootstrap Tooltips
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Tax Toggle Logic
    const taxSwitch = document.getElementById("switchCheckDefault");

  taxSwitch.addEventListener("change", () => {
    const taxLabels = document.querySelectorAll(".tax-info");
    const taxBlocks = document.querySelectorAll(".with-tax");

    if (taxSwitch.checked) {
      taxLabels.forEach(label => label.style.display = "none");
      taxBlocks.forEach(tax => tax.style.display = "block");
    } else {
      taxLabels.forEach(label => label.style.display = "inline");
      taxBlocks.forEach(tax => tax.style.display = "none");
    }
  });

    // Scroll Button Logic
    const scrollContainer = document.getElementById("filters-scroll");

    document.querySelector(".scroll-btn.left").addEventListener("click", () => {
      scrollContainer.scrollBy({ left: -200, behavior: "smooth" });
    });

    document.querySelector(".scroll-btn.right").addEventListener("click", () => {
      scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
    });
  });
  // Save scroll position before page unload
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("filterScroll", document.getElementById("filters-scroll").scrollLeft);
});

// Restore scroll position on page load
window.addEventListener("DOMContentLoaded", () => {
  const scrollPos = sessionStorage.getItem("filterScroll");
  if (scrollPos !== null) {
    document.getElementById("filters-scroll").scrollLeft = parseInt(scrollPos, 10);
  }
});




