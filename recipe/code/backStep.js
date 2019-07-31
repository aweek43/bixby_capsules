var console = require("console")

module.exports.function = function backStep (food) {

  if(food.step != 1) {
    food.step -= 1;
  }
  
  var resultfood = {
    "foodName": food.foodName,
    "step": food.step,
    "stepRecipe": food.stepRecipe
  };
  
  console.log(resultfood);

  return resultfood;
}
