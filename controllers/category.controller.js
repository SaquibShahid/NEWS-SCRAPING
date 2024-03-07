require("dotenv").config();
const categoryModel = require("../models/category.model");
const platformModel = require("../models/platforms.model");

const getExistingCategoryFromPlatform = async () => {
  try {
    const categoryArray = [];
    const category = await platformModel.aggregate([
      {
        $unwind: {
          path: "$category",
        },
      },
      {
        $group: {
          _id: "$category.name",
        },
      },
      {
        $project: {
          category: "$_id",
          _id: 0,
        },
      },
    ]);
    for (let i = 0; i < category.length; i++) {
      categoryArray.push(category[i].category);
    }
    console.log(categoryArray);
    //   console.log(categoryArray.length)
  } catch (error) {
    console.log("error from getExistingCategoryFromPlatform", error.message);
  }
};

// getExistingCategoryFromPlatform();
const presentCategory = [
  "Explainers",
  "Features",
  "Lifestyle",
  "City",
  "Elections",
  "World",
  "Vehicle",
  "Cricket",
  "Entertainment",
  "Defence",
  "Opinion",
  "FectCheck",
  "Finance",
  "Politics",
  "Movies",
  "Technology",
  "Astrology",
  "Viral",
  "Education",
  "India",
  "Business",
  "Football",
  "Health",
  "Economy",
  "State",
  "Election",
  "Market",
];

const createCategory=async ()=>{
    try { 
        for(let i=0;i<presentCategory.length;i++) {
            const isCategoryExist=await categoryModel.findOne({name:presentCategory[i]})
            if(isCategoryExist===null){
            const category=new categoryModel({
                name:presentCategory[i]
            })
            await category.save()
        }
        }
        console.log("category created successfully")
    }catch(error){
        console.log("error form createCategory",error.message);
    }
}
createCategory()