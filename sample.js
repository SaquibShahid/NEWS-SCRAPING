// try{

// }catch(error){
//         return res.json({
//             status:"error",
//             message:error.message,
//             responseCode:500,
//             data:null,
//            })
//     }

    
const axios = require('axios');

// Function to summarize text using Cohear-AI API
async function summarizeText(inputText) {
    try {
        const apiKey = 'jvp8rVLpS1rhs8EZNigqf2duy9duSp8hhJh7YsnH';
        const apiUrl = 'https://api.cohear.ai/summarize'; // Check Cohear-AI documentation for the correct URL

        const response = await axios.post(apiUrl, {
            text: inputText,
            apiKey: apiKey
        });

        return response.data.summary;
    } catch (error) {
        console.error('Error summarizing text:', error);
        return null;
    }
}

// Example usage
// const textToSummarize = "Your input text goes here. This can be a long document or article that you want to summarize.";
// summarizeText(textToSummarize)
//     .then(summary => {
//         console.log("Summary:", summary);
//     })
//     .catch(err => {
//         console.error("Error:", err);
//     });

