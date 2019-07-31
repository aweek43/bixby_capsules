var console = require("console")

module.exports.function = function ShowAllRecipe (foodName) {
 const data = require("./recipeData/recipeData.js");
  
  var food = data.filter (function(afood) {
      return afood.foodname == foodName;
    });
  
  if(food.length == 0) {
    var resultfood = {
      "foodName": "아직 준비 중인 레시피 입니다.",
      "ingredient": "아직 준비 중인 레시피 입니다.",
      "stepRecipe": "아직 준비 중인 레시피 입니다.",
      "step": 0
    };
  }
  else {
    var resultfood = {
      "foodName": food[0].foodname,
      "ingredient": food[0].ingredient,
      "stepRecipe": food[0].stepRecipe,
      "step": 0
    };
  }

  console.log(resultfood);

  return resultfood;
}