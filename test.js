const request = require("request-promise");
const cheerio = require("cheerio");

const fun = async () => {
    try {
        const response = await request({
            uri: "https://www.timesnownews.com/viral/optical-illusion-to-test-your-iq-find-raccoon-in-6-seconds-article-108268563",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
            }
        });
        const $ = cheerio.load(response);
        const container = $("h1._1Fcx").text(); // Updated selector
        console.log(container);
    } catch (err) {
        console.log(err.message);
    }
}

fun();
