class food{
    constructor(){
        this.foodStock = 0;
        this.image = loadImage("images/Milk.png");
    }
    getFoodStock(){
        var foodStockRef = database.ref("Food"); 
        foodStockRef.on("value",function(data){
            this.foodStock = data.val();
        });

    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1;
        }
        database.ref("/").update({
            Food:this.foodStock
        })
    }

    display(){
        var x = 80, y = 100;
    
        if(this.foodStock!==0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x = 80;
                    y = y + 50;
                }
                imageMode(CENTER);
                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
    }
}