//Create variables here
var dog;//happyDog;
var dogImage,happyDogImage;

var milkBottleImage

var database;

var foodS, foodStock;

var fedTime,lastFed;

var foodObj;

var feedDogButton,addFoodButton;

function preload()
{
	//load images here
  dogImage = loadImage("images/Dog.png");
  happyDogImage = loadImage("images/happydog.png");
  milkBottleImage = loadImage("images/Milk.png");
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();

  //foodStock = database.ref("Food");
  //foodStock.on("value",readStock);
  //foodStock.setup(20);

  dog = createSprite(250,300,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.2;
  
  foodObj = new food();
  foodObj.getFoodStock();

  feedDogButton = createButton("Feed the dog");
  feedDogButton.position(500,100);
  feedDogButton.mousePressed(feedDog);

  addFoodButton = createButton("Add food for the dog");
  addFoodButton.position(600,100);
  addFoodButton.mousePressed(addFood);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed=data.val();
})
}


function draw() {  
  background(46, 139, 87);

  foodObj.display();

  currentTime = hour();
  
  //if(keyCode===UP_ARROW){
  //  writeStock(foodS);
  //  dog.addImage(happyDogImage);
  //}
  //textSize(25);
  //fill("blue");
  //stroke("blue");
  //text("Press UP arrow to feed the dog milk",60,150)
  //text("Food Remaining:"+foodS,140,200);
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed:"+lastFed%12+"PM",200,30);
  }else if(lastFed===0){
    text("Last Fed:12AM",210,30);
  }else{
    text("Last Feed:"+lastFed+"AM",200,30);
  }

  drawSprites();
  //add styles here
}

//function readStock(data){
//  foodS = data.val();
//}

//function writeStock(x){
//  database.ref("/").update({foodS:x});
//}

function addFood(){
  if(foodObj.foodStock<20){
    foodObj.foodStock = foodObj.foodStock+1;
  }
    database.ref("/").updateFoodStock(foodObj.foodStock)
}

function feedDog(){
  dog.addImage(happyDogImage);
  foodObj.deductFood();
  foodObj.updateFoodStock(foodObj.foodStock);
  //database.ref("/").updateFoodStock({
  //  Food:foodObj.getFoodStock(),
  //  fedTime:hour()
  //})
}