// js/lang.js

// Translation dictionary
const translations = {
    en: {
        // Main Page (index.html)
        heroTitle: "My AI-Crafted Web Apps",
        heroSubtitle: "Exploring the edge of creativity with code and intelligence",
        projectsTitle: "Projects",
        dreamMemoTitle: "DreamMemo",
        dreamMemoDescription: "AI-powered dream diary that analyzes and classifies your dreams by mood and theme.",
        viewDetailsButton: "View Details", // Reused for all project cards
        habitScopeTitle: "HabitScope",
        habitScopeDescription: "A habit tracker that visualizes your routine using animated color waves and daily pulses.",
        whisperPitchTitle: "WhisperPitch",
        whisperPitchDescription: "A pitch generator that turns your rough ideas into crisp slide decks in seconds.",
        aboutMeTitle: "About Me",
        aboutMeText: "I’m Odaka, a developer blending AI and art to make ideas interactive.",
        githubLink: "GitHub",
        twitterLink: "Twitter",
        footerText: "Built with AI & curiosity.",

        // Project Detail Pages (projects/*/index.html)
        projectPageHeaderSuffix: "- Project Details", // For <title> and H1 suffix
        backToPortfolioLink: "Back to Portfolio",
        projectDetailsTitle: "Project Details",
        detailsPlaceholderText: "Details for the project will be displayed here soon.", // Generic placeholder
        placeholderPageText: "This is a placeholder page.",
        projectFooterText: "© 2024 My Portfolio. All rights reserved."
    },
    ja: {
        // Main Page (index.html)
        heroTitle: "私のAI制作ウェブアプリ",
        heroSubtitle: "コードと知性で創造性の限界を探る",
        projectsTitle: "プロジェクト",
        dreamMemoTitle: "ドリームメモ",
        dreamMemoDescription: "AIを活用した夢日記で、気分やテーマ別に夢を分析・分類します。",
        viewDetailsButton: "詳細を見る", // Reused for all project cards
        habitScopeTitle: "ハビットスコープ",
        habitScopeDescription: "アニメーション化されたカラーウェーブとデイリーパルスを使ってルーチンを視覚化する習慣トラッカー。",
        whisperPitchTitle: "ウィスパーピッチ",
        whisperPitchDescription: "あなたのラフなアイデアを数秒で鮮明なスライドデッキに変えるピッチジェネレーター。",
        aboutMeTitle: "私について",
        aboutMeText: "私はオダカ、AIとアートを融合させてアイデアをインタラクティブにする開発者です。",
        githubLink: "GitHub", // Assuming "GitHub" is fine for Japanese, or it could be "ギットハブ"
        twitterLink: "Twitter", // Assuming "Twitter" is fine for Japanese, or it could be "ツイッター"
        footerText: "AIと好奇心で作られました。",

        // Project Detail Pages (projects/*/index.html)
        projectPageHeaderSuffix: "- プロジェクト詳細", // For <title> and H1 suffix
        backToPortfolioLink: "ポートフォリオに戻る",
        projectDetailsTitle: "プロジェクト詳細",
        detailsPlaceholderText: "プロジェクトの詳細は近日中にここに表示されます。", // Generic placeholder
        placeholderPageText: "これはプレースホルダーページです。",
        projectFooterText: "© 2024 私のポートフォリオ。無断複写・転載を禁じます。"
    }
};

/**
 * Sets the chosen language and updates the page content.
 * @param {string} lang - The language code (e.g., 'en', 'ja').
 */
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    updateContent();
}

/**
 * Retrieves the stored language or defaults to English.
 * @returns {string} The current language code.
 */
function getLanguage() {
    return localStorage.getItem('language') || 'en';
}

/**
 * Updates the content of elements with 'data-translate-key' attributes.
 */
function updateContent() {
    const currentLang = getLanguage();
    const dictionary = translations[currentLang];

    if (!dictionary) {
        console.error(`Translations not found for language: ${currentLang}`);
        return;
    }

    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.dataset.translateKey;
        const translation = dictionary[key];

        if (translation !== undefined) {
            // Handle specific elements like title
            if (element.tagName === 'TITLE') {
                // For project pages, the title might be "ProjectName - Suffix"
                // We assume the main project name part of the title does not need translation via this key,
                // or it has its own separate data-translate-key.
                // This logic primarily handles the suffix.
                // A more robust solution might involve a separate key for the base title on project pages.
                const pageTitleBase = document.title.split(translations.en.projectPageHeaderSuffix)[0].split(translations.ja.projectPageHeaderSuffix)[0];
                if (key === 'projectPageHeaderSuffix') {
                     // Check if the element is the main H1 of a project page to append suffix
                    const projectH1 = document.querySelector('header h1[data-translate-key]');
                    if (projectH1) {
                        const projectTitleKey = projectH1.dataset.translateKey;
                        const translatedProjectTitle = dictionary[projectTitleKey] || projectH1.textContent; // Fallback to current text
                        document.title = translatedProjectTitle + translation;
                    } else {
                         // Fallback for pages where project H1 might not be specifically tagged or needs different handling
                        document.title = pageTitleBase + translation;
                    }
                } else {
                    element.textContent = translation;
                }

            } else if (element.tagName === 'META' && element.name === 'description') {
                element.setAttribute('content', translation);
            } else if (element.tagName === 'A' && key === 'viewDetailsButton') { // Ensure buttons get updated
                 element.textContent = translation;
            }
            else {
                element.textContent = translation;
            }
        } else {
            console.warn(`Translation key "${key}" not found for language "${currentLang}".`);
            // Optionally, set to English as a fallback or show the key
            // element.textContent = translations.en[key] || key;
        }
    });

    // Special handling for project page H1 titles (e.g., "DreamMemo" in "DreamMemo - Project Details")
    // These H1s should use keys like 'dreamMemoTitle', 'habitScopeTitle', etc.
    // The suffix is handled by 'projectPageHeaderSuffix' for the <title> tag.
    // This also updates the H1 on the project page itself if it has a data-translate-key.
    const projectPageH1 = document.querySelector('body.project-page header h1[data-translate-key]');
    if (projectPageH1) {
        const key = projectPageH1.dataset.translateKey;
        const translation = dictionary[key];
        if (translation) {
            projectPageH1.textContent = translation;
        }
    }
}

// Initial content update when the script loads
// Ensure this runs after the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', updateContent);
// Simpler approach for now: updateContent will be called explicitly after including the script
// and after setting up language switchers.
