/*
let franc;
let langs;
let initializing = null;

async function detectLanguage(text) {
  if (!text || text.trim().length < 5) return "Unknown";

  if (!franc) {
    if (!initializing) {
      initializing = Promise.all([
        // Using franc-all for better Play Store coverage (CJK support)
        import("franc-all").catch(() => import("franc-min")), 
        import("langs")
      ]).then(([f, l]) => {
        franc = f.franc;
        langs = l.default;
      });
    }
    await initializing;
  }

  try {
    // 1. Get the 3-letter ISO code
    const langCode = franc(text);

    if (langCode === "und") return "Unknown";

    // 2. Convert 'jpn' to 'Japanese', etc.
    const language = langs.where("3", langCode);
    
    // If it's a valid language, return the name; otherwise return the code
    return language ? language.name : langCode;

  } catch (error) {
    return "Unknown";
  }
}

module.exports = detectLanguage;

*/



let franc;
let langs;

async function detectLanguage(text) {

  if (!franc) {
    franc = (await import("franc")).franc;
    langs = (await import("langs")).default;
  }

  if (!text || text.trim().length < 3) {
    return "Unknown";
  }

  // 👇 restrict to only 6 languages
  const langCode = franc(text, {
    only: ['eng', 'rus', 'jpn', 'kor', 'vie', 'tha', 'ind', 'deu', 'mal']
  });

  if (langCode === "und") {
    return "Unknown";
  }

  if (text.length < 5) return "English";

  const language = langs.where("3", langCode);

  return language ? language.name : "Unknown";
}

module.exports = detectLanguage;