// JavaScript for collapsible behavior
document.addEventListener("DOMContentLoaded", function () {
  // Load content from JSON
  loadContentFromJSON();
});

// Function to setup collapsible elements
function setupCollapsibles() {
  const collapsibles = document.querySelectorAll(".collapsible");

  collapsibles.forEach(function (coll) {
    coll.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

// Function to load content from JSON
function loadContentFromJSON() {
  fetch("assets/content.json")
    .then((response) => response.json())
    .then((data) => {
      const sectionsContainer = document.getElementById("sections-container");

      // Generate sections with automatic lettering
      data.sections.forEach((section, index) => {
        // Create the letter prefix (A, B, C, etc.)
        const letter = String.fromCharCode(65 + index); // 65 is ASCII for 'A'

        // Create collapsible button
        const button = document.createElement("button");
        button.type = "button";
        button.className = "collapsible";
        button.textContent = `${letter}. ${section.title}`;
        sectionsContainer.appendChild(button);

        // Create content container
        const contentDiv = document.createElement("div");
        contentDiv.className = "content";
        sectionsContainer.appendChild(contentDiv);

        // Create inner content container
        const contentInner = document.createElement("div");
        contentInner.className = "content-inner";
        contentDiv.appendChild(contentInner);

        // Populate with content items
        section.content.forEach((item) => {
          if (item.subheading) {
            const heading = document.createElement("h4");
            heading.textContent = item.subheading;
            contentInner.appendChild(heading);
          }

          if (item.isTaawudz) {
            const taawudz = document.createElement("div");
            taawudz.className = "taawudz";
            taawudz.innerHTML = `<span>أَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطٰنِ الرَّجِيْمِ</span>`;
            contentInner.appendChild(taawudz);
          }

          if (item.isBasmallah) {
            const basmallah = document.createElement("div");
            basmallah.className = "basmallah";
            basmallah.innerHTML = `<span>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</span>`;
            contentInner.appendChild(basmallah);
          }

          if (item.arabicText) {
            const arabic = document.createElement("div");
            arabic.className = "arabic-text";
            arabic.innerHTML = item.arabicText;
            contentInner.appendChild(arabic);
          }

          if (item.latin) {
            const latin = document.createElement("div");
            latin.className = "latin";
            latin.innerHTML = `<em>${item.latin}</em>`;
            contentInner.appendChild(latin);
          }

          if (item.translation) {
            const translation = document.createElement("div");
            translation.className = "translation";
            translation.textContent = item.translation;
            contentInner.appendChild(translation);
          }

          if (item.note) {
            const note = document.createElement("div");
            note.className = "important";
            note.innerHTML = item.note; // Use innerHTML to render HTML content
            contentInner.appendChild(note);
          }

          if (item.isTakbir) {
            const takbir = document.createElement("div");
            takbir.className = "takbir";
            takbir.innerHTML = `<span>لَا إِلٰهَ إِلَّا اللّٰهُ وَاللّٰهُ أَكْبَرُ</span>`;
            contentInner.appendChild(takbir);
          }
        });
      });

      // Setup collapsible behavior after content is loaded
      setupCollapsibles();
    })
    .catch((error) => {
      console.error("Error loading content:", error);
    });
}
