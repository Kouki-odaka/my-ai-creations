// js/main.js

/**
 * Initializes the language switching functionality after the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the language toggle buttons
    const langEnButton = document.getElementById('lang-en');
    const langJaButton = document.getElementById('lang-ja');

    // Check if the language toggle buttons exist on the page
    if (langEnButton && langJaButton) {
        // Add click event listener for the English language button
        langEnButton.addEventListener('click', () => {
            setLanguage('en'); // Defined in lang.js
        });

        // Add click event listener for the Japanese language button
        langJaButton.addEventListener('click', () => {
            setLanguage('ja'); // Defined in lang.js
        });
    } else {
        // Optional: Log a message if buttons aren't found, useful for debugging pages
        // where the toggle is not supposed to be (though for this project, it's on all pages)
        // console.log('Language toggle buttons not found on this page.');
    }

    // Update page content to the stored or default language on initial load
    // This function is defined in lang.js
    if (typeof updateContent === 'function') {
        updateContent();
    } else {
        console.error('updateContent function is not defined. Ensure lang.js is loaded before main.js.');
    }
});
