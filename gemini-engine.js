// gemini-engine.js (Corrected Model Endpoint Configuration)
const EMBEDDED_API_KEY = "AQ.Ab8RN6JRnw9d6ClJQIt5XMw3uMy0SptxAJhrL0jJfNEzTejEbw";

export async function synthesizeResearch(query) {
    if (!EMBEDDED_API_KEY || EMBEDDED_API_KEY.includes("AQ.Ab8RN6JRnw9d6ClJQIt5XMw3uMy0SptxAJhrL0jJfNEzTejEbw")) {
        return "<span style='color: #ef4444;'>Error: Insert your valid Gemini API key.</span>";
    }

    try {
        // Utilizing a stable, production-available model endpoint
       const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${EMBEDDED_API_KEY}`, {
            method: 'POST',
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
