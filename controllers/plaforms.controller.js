require("dotenv").config();
const platformModel = require("../models/platforms.model");
const request = require("request-promise");
const cheerio = require("cheerio");
const rawNewsModel = require("../models/rawnews.model");

const createPlatformsNews = async () => {
  try {
    const platforms = await platformModel.find().select({ __v: 0 });
    for ( let platformsIndex = 0; platformsIndex < platforms.length; platformsIndex++) {
        let singlePlatforms = platforms[platformsIndex];
      let category = singlePlatforms.category;

      for (let categoryIndex = 0;categoryIndex < category.length; categoryIndex++) {

        const singleCategory = singlePlatforms.category[categoryIndex];
        const response = await request({
            uri: singleCategory.url,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
            }
        });
        let $ = cheerio.load(response);
     
        const maniCalsss = singleCategory.listClasses.main;
        let container = null;

        for (let i = 0; i < maniCalsss.length; i++) {
          container = $(
            singlePlatforms.category[categoryIndex].listClasses.main[i]
          );
          if (container.text().length > 0) {
            break;
          }
        }

        container.each(async function (index, element) {
       
          const mainTitle = singleCategory.listClasses.title;
          let title = null;
          for (let i = 0; i < mainTitle.length; i++) {
            title = $(element).find(singleCategory.listClasses.title[i]);
            if (title.text().length > 0) {
              break;
            }
          }
      
          title.each(async (Tindex, Telement) => {
           
            let detailsUrl = null;
            const titleText = $(Telement).text();

            const mainUrl = singleCategory.listClasses.url;
            for (let i = 0; i < mainUrl.length; i++) {
              detailsUrl = $(element)
                .find(singleCategory.listClasses.url[i])
                .eq(Tindex)
                .attr("href");
              if (detailsUrl !== undefined) {
                break;
              }
            }
       
            if (detailsUrl !== undefined) {
              {
                const detailsResponse = await request({
                    uri: detailsUrl,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
                    }
                });

                const $ = cheerio.load(detailsResponse);
              
                const detailsTitleClass = singleCategory.detailsClasses.title;
                let detailsTitle = null;
                
                for (let i = 0; i < detailsTitleClass.length; i++) {
                  detailsTitle = $(detailsTitleClass[i]).text();
                  if (detailsTitle.length > 0) {
                    break;
                  }
                }
              
                const isTitleExisit = await rawNewsModel
                  .findOne({ title: detailsTitle })
                  .select({ _id: 1 });

                if (isTitleExisit === null) {
                  const detailsImageClass = singleCategory.detailsClasses.image;
                  let detailsImage = null;

                  for (let i = 0; i < detailsImageClass.length; i++) {
                    detailsImage = $(detailsImageClass[i]).attr("src");
                    if (detailsImage !== undefined) {
                      break;
                    }
                  }

                  const detailsDescriptionClass =
                  singleCategory.detailsClasses.description;
                  let detailsDescription = "";
                  for (let i = 0; i < detailsDescriptionClass.length; i++) {
                    detailsDescription = $(detailsDescriptionClass[i]).text();
                    if (detailsDescription.length > 0) {
                      break;
                    }
                  }

                  let detailsTagClass = singleCategory.detailsClasses.tags;
                  let detailsTag = [];
                  for (let i = 0; i < detailsTagClass.length; i++) {
                    $(detailsTagClass[i]).each((index, item) => {
                      detailsTag.push($(item).text());
                    });
                    if (detailsTag.length > 0) {
                      break;
                    }
                  }

                  if (detailsUrl &&detailsImage &&detailsDescription &&detailsTitle) {
                    const rawnews = new rawNewsModel({
                      title: detailsTitle,
                      sourceUrl: detailsUrl,
                      image: detailsImage,
                      description: detailsDescription,
                      tags: detailsTag,
                      category: singleCategory.name,
                      channelName: singlePlatforms.newsPlatform,
                    });
                    await rawnews.save();
                    console.log({ dataInsert: detailsTitle,
                    channelName:singlePlatforms.newsPlatform,
                category:singleCategory.name });
                  }
                } else {
                  console.log({
                    allreadyExist: titleText,
                    channelName: singlePlatforms.newsPlatform,
                    category: singleCategory.name,
                  });
                }
              }
            }
          });
        });
      }
    }
  } catch (error) {
    console.log("error----->", error.message);
  }
};
createPlatformsNews();
