var console = require("console")

module.exports.function = function ShowStepRecipe (food) {

  if(food.stepRecipe.length > food.step) {
    food.step += 1;
  }
  
  var resultfood = {
    "foodName": food.foodName,
    "step": food.step,
    "stepRecipe": food.stepRecipe
  };
  
  console.log(resultfood);

  return resultfood;
}
