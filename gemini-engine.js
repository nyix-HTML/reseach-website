// gemini-engine.js (Cleaned API Check Logic)
const EMBEDDED_API_KEY = "AQ.Ab8RN6JRnw9d6C1JQit5XMW3uMy0SptxAJhrL0jJfNEzTejEbw";

export async function synthesizeResearch(query) {
    // Fixed the check: removed self-matching includes trap
    if (!EMBEDDED_API_KEY || EMBEDDED_API_KEY.includes("YOUR_ACTUAL")) {
        return "<span style='color: #ef4444;'>Error: Insert your valid Gemini API key.</span>";
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
            return marked.parse(data.candidates[0].content.parts[0].text);
        } else {
            return `<span style='color: #ef4444;'>API Error: ${data.error?.message || 'Invalid response structure.'}</span>`;
        }
    } catch (err) {
        return "<span style='color: #ef4444;'>Network error executing remote call.</span>";
    }
}
