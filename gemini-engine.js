// gemini-engine.js (Standalone Logic File)
const EMBEDDED_API_KEY = "AIzaSy_YOUR_ACTUAL_GEMINI_API_KEY_HERE";

export async function synthesizeResearch(query) {
    if (!EMBEDDED_API_KEY || EMBEDDED_API_KEY.includes("YOUR_ACTUAL")) {
        return "<span style='color: #ef4444;'>Error: Please configure your API key inside gemini-engine.js</span>";
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${EMBEDDED_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Act as an academic encyclopedia. Provide a rigorous breakdown for: "${query}". Format in clean Markdown.` }]
                }]
            })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0].content) {
            const rawText = data.candidates[0].content.parts[0].text;
            return marked.parse(rawText);
        } else {
            return "<span style='color: #ef4444;'>API Error: Invalid response structure.</span>";
        }
    } catch (err) {
        return "<span style='color: #ef4444;'>Network error executing remote call.</span>";
    }
}
