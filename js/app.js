document.addEventListener("DOMContentLoaded", function () {
  loadContent();
  setupSettingsPanel();
  setCurrentYear();
});

function loadContent() {
  fetch("assets/content.json")
    .then((response) => response.json())
    .then((data) => {
      renderContent(data);
    })
    .catch((error) => {
      console.error("Error loading content:", error);
      document.getElementById("main-content").innerHTML = `
                <div class="error">
                    <p>Gagal memuat konten. Silakan coba lagi nanti.</p>
                </div>
            `;
    });
}

function renderContent(data) {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = ""; // Clear loading message

  data.sections.forEach((section) => {
    const sectionElement = document.createElement("section");
    sectionElement.className = "section";

    // Create section header
    const sectionHeader = document.createElement("div");
    sectionHeader.className = "section-header";

    const sectionTitle = document.createElement("h2");
    sectionTitle.className = "section-title";
    sectionTitle.textContent = section.title;
    sectionHeader.appendChild(sectionTitle);

    // Create section content
    const sectionContent = document.createElement("div");
    sectionContent.className = "section-content";

    // Add content items
    section.content.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "item";

      // Add subheading if exists
      if (item.subheading) {
        const subheading = document.createElement("h3");
        subheading.className = "subheading";
        subheading.textContent = item.subheading;
        itemElement.appendChild(subheading);
      }

      // Add name if exists (new property that shows before Arabic text)
      if (item.name) {
        const nameElement = document.createElement("div");
        nameElement.className = "name-text";
        nameElement.innerHTML = item.name;
        itemElement.appendChild(nameElement);
      }

      // Add text if exists (text that appears before Arabic)
      if (item.text) {
        const textElement = document.createElement("div");
        textElement.className = "pre-arabic-text";
        textElement.innerHTML = item.text;
        itemElement.appendChild(textElement);
      }

      // Add basmalah if needed
      if (item.isBasmallah) {
        const bismillah = document.createElement("div");
        bismillah.className = "arabic-text bismillah";
        bismillah.innerHTML = "<span>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</span>"; // Using span for styling consistency
        itemElement.appendChild(bismillah);
      }

      // Add Arabic text
      if (item.arabicText) {
        const arabicText = document.createElement("div");
        arabicText.className = "arabic-text";
        arabicText.innerHTML = item.arabicText;
        itemElement.appendChild(arabicText);

        // Create wrapper elements but don't add toggle buttons
        if (item.translation) {
          const translationWrapper = document.createElement("div");
          translationWrapper.className = "translation-wrapper";

          const translation = document.createElement("div");
          translation.className = "translation";
          translation.textContent = item.translation;

          translationWrapper.appendChild(translation);
          itemElement.appendChild(translationWrapper);
        }

        if (item.latin) {
          const latinWrapper = document.createElement("div");
          latinWrapper.className = "latin-wrapper";

          const latin = document.createElement("div");
          latin.className = "latin";
          latin.innerHTML = item.latin;

          latinWrapper.appendChild(latin);
          itemElement.appendChild(latinWrapper);
        }
      }

      // Add notes directly (always visible and will appear after Arabic)
      if (item.note) {
        const noteWrapper = document.createElement("div");
        noteWrapper.className = "note-wrapper";

        const note = document.createElement("div");
        note.className = "note";
        note.innerHTML = item.note;

        noteWrapper.appendChild(note);
        itemElement.appendChild(noteWrapper);
      }

      sectionContent.appendChild(itemElement);
    });

    sectionElement.appendChild(sectionHeader);
    sectionElement.appendChild(sectionContent);
    mainContent.appendChild(sectionElement);
  });
}

// Settings panel functionality
function setupSettingsPanel() {
  // Create settings button and panel
  const settingsBtn = document.createElement("button");
  settingsBtn.className = "settings-fab";
  settingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
  settingsBtn.setAttribute("aria-label", "Pengaturan");

  const settingsPanel = document.createElement("div");
  settingsPanel.className = "settings-panel";
  settingsPanel.innerHTML = `
        <div class="settings-header">
            <h3>Pengaturan</h3>
            <button class="close-settings" aria-label="Tutup pengaturan">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="settings-group">
            <h4>Tampilan</h4>
            <div class="settings-option">
                <label for="show-translations">Tampilkan Terjemahan</label>
                <label class="toggle-switch">
                    <input type="checkbox" id="show-translations">
                    <span class="toggle-slider"></span>
                </label>
            </div>
            <div class="settings-option">
                <label for="show-latin">Tampilkan Latin</label>
                <label class="toggle-switch">
                    <input type="checkbox" id="show-latin">
                    <span class="toggle-slider"></span>
                </label>
            </div>
        </div>
        <div class="settings-group">
            <h4>Ukuran Font Arab</h4>
            <div class="font-size-controls">
                <input type="range" class="font-size-slider" min="70" max="150" value="100" step="5">
                <span class="font-size-value">100%</span>
            </div>
        </div>
        <div class="settings-group">
            <h4>Font Arab</h4>
            <div class="font-choice-group">
                <label class="font-option">
                    <input type="radio" name="font-choice" value="ScheherazadeNew" checked>
                    <span>Scheherazade New </span>
                    <span class="font-preview font-preview-0">بِسْمِ اللّٰهِ</span>
                </label>
                <label class="font-option">
                    <input type="radio" name="font-choice" value="NotoNaskhArabic">
                    <span>Noto Naskh Arabic</span>
                    <span class="font-preview font-preview-1">بِسْمِ اللّٰهِ</span>
                </label>
                <label class="font-option">
                    <input type="radio" name="font-choice" value="Amiri">
                    <span>Amiri (Klasik)</span>
                    <span class="font-preview font-preview-amiri">بِسْمِ اللّٰهِ</span>
                </label>
                <label class="font-option">
                    <input type="radio" name="font-choice" value="LPMQ">
                    <span>LPMQ Isep Misbah</span>
                    <span class="font-preview font-preview-2">بِسْمِ اللّٰهِ</span>
                </label>
            </div>
        </div>
    `;

  // Add to the DOM
  document.body.appendChild(settingsBtn);
  document.body.appendChild(settingsPanel);

  // Toggle panel visibility
  settingsBtn.addEventListener("click", function () {
    settingsPanel.classList.toggle("visible");
  });

  // Close panel when clicking close button
  const closeBtn = settingsPanel.querySelector(".close-settings");
  closeBtn.addEventListener("click", function () {
    settingsPanel.classList.remove("visible");
  });

  // Initialize settings
  let currentFontSize = 100; // Default font size value that will be applied immediately
  let currentFont = 'ScheherazadeNew'; // Set Scheherazade New as the default - better for beginners with clear harakat
  let translationsVisible = false;
  let latinVisible = false;

  // Handle toggle switches
  const translationsToggle = document.getElementById("show-translations");
  const latinToggle = document.getElementById("show-latin");

  // Set initial state for all toggles
  translationsToggle.checked = translationsVisible;
  latinToggle.checked = latinVisible;

  translationsToggle.addEventListener("change", function () {
    translationsVisible = this.checked;
    toggleAllElements(".translation-wrapper", translationsVisible);
  });

  latinToggle.addEventListener("change", function () {
    latinVisible = this.checked;
    toggleAllElements(".latin-wrapper", latinVisible);
  });

  // Handle font size slider
  const fontSizeSlider = settingsPanel.querySelector(".font-size-slider");
  const fontSizeValue = settingsPanel.querySelector(".font-size-value");

  // Set the initial slider value
  fontSizeSlider.value = currentFontSize;
  fontSizeValue.textContent = `${currentFontSize}%`;

  fontSizeSlider.addEventListener("input", function () {
    currentFontSize = parseInt(this.value);
    updateArabicFontSize();
  });

  // Handle font selection
  const fontOptions = settingsPanel.querySelectorAll(".font-option");
  
  // Set the initial selected font in UI
  fontOptions.forEach(option => {
    const radioBtn = option.querySelector('input[type="radio"]');
    if (radioBtn.value === currentFont) {
      option.classList.add("selected");
      radioBtn.checked = true;
    } else {
      option.classList.remove("selected");
      radioBtn.checked = false;
    }
    
    option.addEventListener("click", function() {
      // Update selected UI
      fontOptions.forEach(opt => opt.classList.remove("selected"));
      this.classList.add("selected");
      
      // Get the selected font value
      const radioBtn = this.querySelector('input[type="radio"]');
      radioBtn.checked = true;
      currentFont = radioBtn.value;
      
      // Update the font family
      updateArabicFont();
    });
  });
  
  // Helper function to toggle all elements of a specific class
  function toggleAllElements(selector, show) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      if (show) {
        el.classList.add("visible");
      } else {
        el.classList.remove("visible");
      }
    });
  }

  // Helper function to update Arabic font family
  function updateArabicFont() {
    let fontFamily;
    
    switch(currentFont) {
      case 'ScheherazadeNew':
        fontFamily = "'Scheherazade New', serif";
        break;
      case 'NotoNaskhArabic':
        fontFamily = "'Noto Naskh Arabic', serif";
        break;
      case 'Amiri':
        fontFamily = "'Amiri', serif";
        break;
      case 'LPMQ':
        fontFamily = "'LPMQ', 'Scheherazade New', serif";
        break;
      default:
        fontFamily = "'Scheherazade New', serif";
    }
    
    document.documentElement.style.setProperty('--arabic-font-family', fontFamily);
  }

  // Helper function to update Arabic font size
  function updateArabicFontSize() {
    document.documentElement.style.setProperty("--arabic-font-size", `${currentFontSize}%`);

    // Important: Apply the inline style to all Arabic elements to ensure immediate update
    const arabicElements = document.querySelectorAll(".arabic-text");
    arabicElements.forEach((el) => {
      // For desktop
      if (window.innerWidth >= 768) {
        el.style.fontSize = `calc(1.7rem * ${currentFontSize / 100})`;
      }
      // For mobile
      else {
        el.style.fontSize = `calc(1.6rem * ${currentFontSize / 100})`;
      }
    });

    fontSizeValue.textContent = `${currentFontSize}%`;
  }

  // Apply initial font and font size
  updateArabicFont();
  updateArabicFontSize();

  // Apply the initial font size as soon as the DOM is ready
  // This needs to run BEFORE any other code to ensure the default size is applied
  updateArabicFontSize();

  // Wait a short time and apply again (to overcome any dynamic content issues)
  setTimeout(updateArabicFontSize, 100);

  // Apply font size immediately on page load
  updateArabicFontSize();

  // Click outside to close
  document.addEventListener("click", function (event) {
    if (
      !settingsPanel.contains(event.target) &&
      !settingsBtn.contains(event.target) &&
      settingsPanel.classList.contains("visible")
    ) {
      settingsPanel.classList.remove("visible");
    }
  });
}

// Function to set current year in footer
function setCurrentYear() {
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
}