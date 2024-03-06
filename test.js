const request = require("request-promise");
const cheerio = require("cheerio");

const fun = async () => {
    try {
        const response = await request({
            uri: "https://www.republicworld.com/education/ugc-releases-list-of-central-universities-granted-graded-autonomy-issues-fee-refund-directive/",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
            }
        });
        const $ = cheerio.load(response);
        const container = $("div.storyTitle h1").text(); // Updated selector
        console.log(container);
    } catch (err) {
        console.log(err.message);
    }
}

fun();
