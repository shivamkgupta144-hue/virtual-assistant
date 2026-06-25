import axios from "axios"
const geminiResponse = async (command, assistantName, userName) => {
    try {
        const apiUrl = process.env.GEMINI_API_URL

        console.log(process.env.GEMINI_API_URL);
        console.log(process.env.GEMINI_API_KEY);

        const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}. 
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month"|"calculator-open" | "instagram-open" |"facebook-open" |"weather-show"
  ,
  "userInput": "<original user input>" {only remove your name from userinput if exists} and agar kisi ne google ya youtube pe kuch search karne ko bola hai to userInput me only bo search baala text jaye,

  "response": "<a short spoken response to read out loud to the user>"
}

Instructions:
- "type": determine the intent of the user.
- "userInput": original sentence the user spoke.
- "response": A short, natural, voice-friendly reply that always includes the user's search query when the type is "google-search", "youtube-search", or "youtube-play".

Type meanings:
- "general": if it's a factual or informational question. aur agar koi aisa question puchta hai jiska answer tume pata hai usko bhi general ki category me rakho bas short answer dena
- "google-search": if user wants to search something on Google .
- "youtube-search": if user wants to search something on YouTube.
- "youtube-play": if user wants to directly play a video or song.
- "calculator-open": if user wants to  open a calculator .
- "instagram-open": if user wants to  open instagram .
- "facebook-open": if user wants to open facebook.
-"weather-show": if user wants to know weather
- "get-time": if user asks for current time.
- "get-date": if user asks for today's date.
- "get-day": if user asks what day it is.
- "get-month": if user asks for the current month.

Important:
- Use ${userName} agar koi puche tume kisne banaya
- Only respond with the JSON object, nothing else.

- For "google-search", the response must include what is being searched.
  Example: "Searching Virat Kohli on Google."

- For "youtube-search", the response must include what is being searched.
  Example: "Searching Arijit Singh songs on YouTube."

- For "youtube-play", the response must include the song or video name.
  Example: "Playing Kesariya on YouTube."

- Never reply with only "Sure", "Okay", "Done", or "Searching".
- Always mention the search query in the response.

- If the user wants to search anything on Google, return type "google-search".
- If the user wants to search anything on YouTube, return type "youtube-search".
- If the user wants to play any song, video, music, trailer, or audio, return type "youtube-play".
- If user says "calculator kholo", then type must be "calculator-open".
- If user says "instagram kholo", then type must be "instagram-open".
- If user says "facebook kholo", then type must be "facebook-open".
- If user asks weather or temperature, then type must be "weather-show".

- Never return "general" for the above commands.


now your userInput- ${command}
`;





        let result;

        for (let i = 0; i < 3; i++) {
            try {
                result = await axios.post(
                    `${apiUrl}?key=${process.env.GEMINI_API_KEY}`,
                    {
                        contents: [
                            {
                                parts: [{ text: prompt }]
                            }
                        ]
                    }
                );

                break;
            } catch (error) {

                if (error.response?.status === 503 && i < 2) {
                    console.log(`Retry ${i + 1}`);
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    continue;
                }

                throw error;
            }
        }
        return result.data.candidates[0].content.parts[0].text
    } catch (error) {
        console.log("GEMINI ERROR STATUS:", error.response?.status);
        console.log("GEMINI ERROR DATA:", error.response?.data);
        console.log("GEMINI ERROR MESSAGE:", error.message);

        if (error.response?.status === 503) {
            return JSON.stringify({
                type: "general",
                userInput: command,
                response: "Gemini is busy right now, please try again after a few moments."
            });
        }

        if (error.response?.status === 429) {
            return JSON.stringify({
                type: "general",
                userInput: command,
                response: "Gemini quota exceeded. Please try again later."
            });
        }

        return JSON.stringify({
            type: "general",
            userInput: command,
            response: "Gemini service is currently unavailable."
        });
    }
}

export default geminiResponse