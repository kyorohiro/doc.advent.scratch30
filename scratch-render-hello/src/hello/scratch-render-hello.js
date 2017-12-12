const ScratchRender = require('scratch-render');
    class Chara {
       constructor(renderer, name, imageUrl, x=0, y=0) {
           this.x = x;
           this.y = y;
           this.name;
           this.drawableID = renderer.createDrawable();
           this.updateImage(renderer, this.drawableID, imageUrl);
       }

       updateImage(renderer, drawableID, imageUrl) {
            var image = new Image();
            image.crossOrigin = 'anonymous';
            image.src = imageUrl;
            image.onload = function () {
                var skinId = renderer.createBitmapSkin(image);
                console.log(""+drawableID);
                renderer.updateDrawableProperties(drawableID, {
                    skinId: skinId
                });
            };
       }
       update(renderer) {
            renderer.updateDrawableProperties(this.drawableID, {
                position: [this.x, this.y],
                scale: [20, 20],
                direction: 90
            });
       }
       onKeyDown(keyCode) {}
   }

   class CharaA extends Chara {
       onKeyDown(keyCode) {
            switch(keyCode) {
                case 37: // left
                this.x -=10;
                break;
                case 39: // right
                this.x +=10;
                break;
                case 38: // up
                this.y +=10;
                break;
                case 40: // down
                this.y -=10;
                break;
            }
       }
    }
    class CharaB extends Chara {
       onKeyDown(keyCode) {
            switch(keyCode) {
                case 72: //h
                this.x -=10;
                break;
                case 76: //l
                this.x +=10;
                break;
                case 75: //k
                this.y +=10;
                break; 
                case 74: //j
                this.y -=10;
                break;
            }
       }
    }

    var canvas = document.getElementById('scratch-stage');
    var renderer = new ScratchRender(canvas);
    var chara1 = new CharaA(renderer, "test", "icon.png", -50,0);
    var chara2 = new CharaB(renderer, "test", "icon.png", 50,0);

    document.onkeydown = function (ev) {
        chara1.onKeyDown(ev.keyCode);
        chara2.onKeyDown(ev.keyCode);
    };


    function drawStep() {
        chara1.update(renderer);
        chara2.update(renderer);
        renderer.draw();
        requestAnimationFrame(drawStep);
    }
    drawStep();