// script.js
const translations = {
    heroTitle: {
        en: "My AI-Crafted Web Apps",
        ja: "AIが作成した私のウェブアプリ"
    },
    heroSubtitle: {
        en: "Exploring the edge of creativity with code and intelligence",
        ja: "コードと知能で創造性の限界を探る"
    },
    projectsTitle: {
        en: "Projects",
        ja: "プロジェクト"
    },
    dreamMemoTitle: {
        en: "DreamMemo",
        ja: "ドリームメモ"
    },
    dreamMemoDescription: {
        en: "AI-powered dream diary that analyzes and classifies your dreams by mood and theme.",
        ja: "AI搭載の夢日記で、気分やテーマごとに夢を分析・分類します。"
    },
    viewDemoButton: { // This key will be reused for all demo buttons
        en: "View Demo",
        ja: "デモを見る"
    },
    habitScopeTitle: {
        en: "HabitScope",
        ja: "ハビットスコープ"
    },
    habitScopeDescription: {
        en: "A habit tracker that visualizes your routine using animated color waves and daily pulses.",
        ja: "アニメーション化されたカラーウェーブと毎日のパルスを使用してルーチンを視覚化する習慣トラッカー。"
    },
    whisperPitchTitle: {
        en: "WhisperPitch",
        ja: "ウィスパーピッチ"
    },
    whisperPitchDescription: {
        en: "A pitch generator that turns your rough ideas into crisp slide decks in seconds.",
        ja: "あなたのラフなアイデアを数秒で鮮明なスライドデッキに変えるピッチジェネレーター。"
    },
    aboutTitle: {
        en: "About Me",
        ja: "私について"
    },
    aboutBio: {
        en: "I’m Odaka, a developer blending AI and art to make ideas interactive.",
        ja: "私はAIとアートを融合させてアイデアをインタラクティブにする開発者、オダカです。"
    },
    githubLinkText: { // Changed key to be more specific
        en: "GitHub",
        ja: "GitHub"
    },
    twitterLinkText: { // Changed key to be more specific
        en: "Twitter",
        ja: "Twitter"
    },
    footerText: {
        en: "Built with AI & curiosity.",
        ja: "AIと好奇心で作られました。"
    }
};

// Function to set the language
function setLanguage(lang) {
    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        if (translations[key] && translations[key][lang]) {
            element.textContent = translations[key][lang];
        }
    });
    // Store the selected language in localStorage
    localStorage.setItem('language', lang);

    // Update active button style
    if (lang === 'en') {
        document.getElementById('lang-en').classList.add('bg-white', 'text-purple-600');
        document.getElementById('lang-ja').classList.remove('bg-white', 'text-purple-600');
    } else if (lang === 'ja') {
        document.getElementById('lang-ja').classList.add('bg-white', 'text-purple-600');
        document.getElementById('lang-en').classList.remove('bg-white', 'text-purple-600');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const langEnButton = document.getElementById('lang-en');
    const langJaButton = document.getElementById('lang-ja');

    if (langEnButton && langJaButton) {
        langEnButton.addEventListener('click', () => setLanguage('en'));
        langJaButton.addEventListener('click', () => setLanguage('ja'));

        // Load saved language or default to English
        const savedLang = localStorage.getItem('language') || 'en';
        setLanguage(savedLang);
    } else {
        console.error("Language switch buttons not found!");
    }
});
