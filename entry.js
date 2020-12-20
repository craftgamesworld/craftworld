var Background=function(){};Background.prototype.aTiles,Background.prototype.nTiles,Background.prototype.init=function(a){var b=a.game;this.aTiles=b.display.getAllTileSprite("bg"),this.nTiles=this.aTiles.length;for(var c=0;c<this.nTiles;c++){var d=this.aTiles[c];0==c?(d.width=b.options.gameWidth,d.height=b.options.gameHeight,d.tileScale.x=b.options.gameHeight/d.height,d.tileScale.y=b.options.gameHeight/d.height):(d.width=b.options.gameWidth,d.height=d.height*b.options.scaleAssets>>0,d.tileScale.x=b.options.scaleAssets,d.tileScale.y=b.options.scaleAssets),d.y=b.options.gameHeight-d.height<<0,b.add.existing(d)}var e=.01,f=.34,g=this.nTiles>1?(f-e)/(this.nTiles-1):0;for(c=0;c<this.nTiles;c++)d=this.aTiles[c],d.ratioMove=e+g*c},Background.prototype.move=function(a){for(var b=0;b<this.nTiles;b++){var c=this.aTiles[b];c.tilePosition.x-=a*c.ratioMove}},Background.prototype.positionTilesY=function(a){for(var b=1;b<this.nTiles;b++){var c=this.aTiles[b];c.y=a-c.height}};var FX=function(){var a,b,c;this.init=function(d,e,f,g){var h=d.game;c=0,b=10,a=new Array(b);var i=new Phaser.Graphics(h);i.beginFill(h.options.config.color_fx,.05),i.drawCircle(0,0,2*g*h.options.scaleAssets<<0),i.endFill();for(var j=i.generateTexture(),k=0;b>k;k++){var l=new Phaser.Sprite(h,0,0,j);l.anchor.set(.5),l.alpha=0,e.addChild(l),a[k]=l}},this.update=function(d,e,f,g){f*=.1;var h=a[c];h.x=d,h.y=e,h.scale.set(1),h.alpha=g,c++,c>=b&&(c=0);for(var i=0;b>i;i++)h=a[i],h.alpha>0&&(h.x-=2*f,h.alpha-=.1,h.scale.set(h.alpha))}},Hero=function(){};Hero.prototype=Object.create(Phaser.Image.prototype),Hero.prototype.constructor=Hero,Hero.prototype.midW=0,Hero.prototype.midH=0,Hero.prototype.collisionW=0,Hero.prototype.collisionH=0,Hero.prototype.isBlink=!1,Hero.prototype.countBlink=!1,Hero.prototype.isAnimating=!1,Hero.prototype.imageRun,Hero.prototype.imageJump,Hero.prototype.imageDown,Hero.prototype.isImageDown,Hero.prototype.isAnimatedRun,Hero.prototype.isAnimatedJump,Hero.prototype.isAnimatedDown,Hero.prototype.wasOnGround=!0,Hero.prototype.init=function(a){this.game=a.game;var b="tinyWings"==this.game.options.config.gameplay,c=b?1:.5;Phaser.Image.call(this,this.game,0,0,null),this.anchor.set(.5,c),this.isAnimatedRun=this.game.display.isAnimated("hero_run"),this.isAnimatedRun?(this.imageRun=this.game.display.getSpriteSheetScaled("hero_run",this.game.options.scaleAssets),this.imageRun.animations.add("run",null,this.imageRun.framerate,!0)):this.imageRun=this.game.display.getImageScaled("hero_run",this.game.options.scaleAssets),this.imageRun.anchor.set(.5,c),this.addChild(this.imageRun),this.isAnimatedJump=this.game.display.isAnimated("hero_jump"),this.isAnimatedJump?(this.imageJump=this.game.display.getSpriteSheetScaled("hero_jump",this.game.options.scaleAssets),this.imageJump.animations.add("jump",null,this.imageJump.framerate,!0)):this.imageJump=this.game.display.getImageScaled(this.game.display.isGroupAvailable("hero_jump")?"hero_jump":"hero_run",this.game.options.scaleAssets),this.imageJump.visible=!1,this.imageJump.anchor.set(.5,c),this.addChild(this.imageJump),this.isImageDown=b,this.isAnimatedDown=this.game.display.isAnimated("hero_down"),this.isImageDown&&this.isAnimatedDown?(this.imageDown=this.game.display.getSpriteSheetScaled("hero_down",this.game.options.scaleAssets),this.imageDown.animations.add("down",null,this.imageDown.framerate,!0)):(this.imageDown=this.game.display.getImageScaled(this.game.display.isGroupAvailable("hero_down")?"hero_down":"hero_run",this.game.options.scaleAssets),this.imageDown.visible=!1),this.isImageDown&&(this.imageDown.visible=!1,this.imageDown.anchor.set(.5,c),this.addChild(this.imageDown)),this.midW=this.imageRun.width>>1,b?this.midH=-(10*this.game.options.scaleAssets<<0):this.midH=(this.imageRun.height>>1)-(10*this.game.options.scaleAssets<<0),this.collisionW=this.midW,this.collisionH=(this.imageRun.height>>1)-(10*this.game.options.scaleAssets<<0),this.game.audio.add("hit",!1),this.game.audio.add("hero_jump",!1),this.game.audio.add("hero_run",!0)},Hero.prototype.playAnimsAndSound=function(){this.game.audio.play("hero_run"),this.isAnimatedRun&&this.imageRun.animations.play("run"),this.isAnimatedJump&&this.imageJump.animations.play("jump"),this.isAnimatedDown&&this.imageDown.animations.play("down")},Hero.prototype.stopAnimsAndSound=function(){this.game.audio.stop("hero_run",500),this.isAnimatedRun&&this.imageRun.animations.stop("run"),this.isAnimatedJump&&this.imageJump.animations.stop("jump"),this.isAnimatedDown&&this.imageDown.animations.stop("down")},Hero.prototype.blink=function(){this.game.audio.play("hit"),this.isBlink=!0,this.countBlink=0},Hero.prototype.backToNormal=function(){this.visible=!0,this.isImageDown&&(this.imageDown.visible=!1),this.imageRun.visible=!0,this.imageJump.visible=!1},Hero.prototype.update=function(a,b){!this.wasOnGround&&b?(this.wasOnGround=!0,this.game.audio.unmute("hero_run"),this.imageRun.visible=!0,this.imageJump.visible=!1,this.isImageDown&&(this.isImageDown.visible=!1)):this.wasOnGround&&!b&&(this.wasOnGround=!1,this.game.audio.play("hero_jump"),this.game.audio.mute("hero_run"),this.isImageDown&&(this.isImageDown.visible=!1),this.imageRun.visible=!1,this.imageJump.visible=!0),this.isImageDown&&(a?(this.imageDown.visible=!0,this.imageRun.visible=!1,this.imageJump.visible=!1):(this.imageRun.visible=b,this.imageJump.visible=!b,this.imageDown.visible=!1)),this.isBlink&&(this.visible=this.countBlink%16>=8,this.countBlink++,this.countBlink>64&&(this.isBlink=!1,this.visible=!0))},Hero.prototype.getRealHeight=function(){return this.imageRun.height};var Hud=function(){};Hud.prototype=Object.create(Phaser.Sprite.prototype),Hud.prototype.constructor=Hud,Hud.prototype.init=function(a){var b=a.game;Phaser.Sprite.call(this,b);var c=b.options.gameWidth>>1,d=b.options.gameWidth-c>>1,e=20*b.options.scaleX<<0,f=20*b.options.scaleY<<0,g=4*b.options.scaleY<<0;this.totalTime=b.options.config.totalTime;var h=new Phaser.Graphics(b);h.beginFill(b.options.config.color_hud_bar_back),h.drawRoundedRect(0,0,c,f,g),h.endFill();var i=new Phaser.Image(b,d,e,h.generateTexture());this.addChild(i);var j=new Phaser.Graphics(b);j.beginFill(b.options.config.color_hud_bar),j.drawRoundedRect(0,0,c,f,g),j.endFill();var k=new Phaser.Image(b,d,e,j.generateTexture());this.addChild(k),this.maskGauge=new Phaser.Graphics(b),this.maskGauge.beginFill(16711680),this.maskGauge.drawRect(0,0,c,f),this.maskGauge.endFill(),this.maskGauge.x=d,this.maskGauge.y=e,this.addChild(this.maskGauge),k.mask=this.maskGauge,this.multiplicator=b.display.getImageScaled("hud_multiplicator",b.options.scaleY),this.multiplicator.anchor.set(.5),this.multiplicator.x=b.options.gameWidth-(this.multiplicator.width>>1)-(10*b.options.scaleX<<0),this.multiplicator.y=50*b.options.scaleY+(this.multiplicator.height>>1),this.multiplicator.visible=!1,this.addChild(this.multiplicator),b.options.isBoxInterface&&(this.showScore=function(){},this.showDistance=function(){},this.showCoins=function(){})},Hud.prototype.start=function(a,b){this.tl=new TweenMax(this.maskGauge.scale,this.totalTime,{x:0,onComplete:a,callbackScope:b,ease:Linear.easeNone})},Hud.prototype.showScore=function(a){null!=this.game.options.callback&&null!=this.game.options.callback.updateScore?this.game.options.callback.updateScore(a):"function"==typeof updateScore&&updateScore(a)},Hud.prototype.showDistance=function(a){null!=this.game.options.callback&&null!=this.game.options.callback.updateDistance?this.game.options.callback.updateDistance(a):"function"==typeof updateDistance&&updateDistance(a)},Hud.prototype.showCoins=function(a){null!=this.game.options.callback&&null!=this.game.options.callback.updateCoins?this.game.options.callback.updateCoins(a):"function"==typeof updateCoins&&updateCoins(a)},Hud.prototype.pause=function(){this.tl.timeScale(.2)},Hud.prototype.resume=function(){this.tl.timeScale(1)},Hud.prototype.showMultiplicator=function(a){if(a)this.multiplicator.visible=a,this.multiplicator.scale.set(0),TweenMax.to(this.multiplicator.scale,.46,{x:1,y:1,ease:Back.easeOut});else{var b=this;TweenMax.to(this.multiplicator.scale,.46,{x:0,y:0,ease:Back.easeIn,onComplete:function(){b.multiplicator.visible=!1}})}},Hud.prototype.addTime=function(a){var b=this.tl.time(),c=b-a;0>=c&&(c=0),this.tl.time(c)};var Item=function(){};Item.prototype=Object.create(Phaser.Image.prototype),Item.prototype.constructor=Item,Item.prototype.isCollide,Item.prototype.isAnimate,Item.prototype.valueScale,Item.prototype.strategy,Item.prototype.midW,Item.prototype.midH,Item.prototype.gapY,Item.prototype.isOnTheRoad,Item.prototype.posX,Item.prototype.init=function(a,b,c,d){Phaser.Image.call(this,a,0,0,b),this.anchor.set(.5),this.strategy=c,this.midW=this.width>>1,this.midH=this.height>>1,this.gapY=d},Item.prototype.animate=function(){this.isAnimate&&(this.valueScale-=.2,this.valueScale<=0?(this.isAnimate=!1,this.visible=!1):this.scale.set(this.valueScale))},Item.prototype.replace=function(a){this.reset(),this.isAnimate=!1,this.isCollide=!1,this.visible=!1,this.valueScale=1,this.isOnTheRoad=!1,this.posX=a,this.scale.set(this.valueScale)},Item.prototype.collide=function(){this.isCollide=!0,this.isAnimate=!0},Item.prototype.forceKill=function(){this.isCollide=!1,this.isAnimate=!1,this.visible=!1,this.kill()};var LevelGenerator=function(){function a(a,c){if(a!=t){var d=b(u.aArraysItems[a]);null!=d&&d.replace(h+c)}}function b(a){var b=0,c=a.length;for(b;c>b;b++){var d=a[b];if(!d.alive)return d}return null}function c(){return j++,j>=l&&(j=0,Phaser.ArrayUtils.shuffle(n)),m[n[j]].visible?c():m[n[j]]}var d=0,e=120,f=1200,g=f,h=0,i=0,j=0,k=0,l=0,m=[],n=[],o=null,p=null,q=0,r=1,s=2,t=3,u=this,v=[[q,q,q],[q,q,q,q,s,q,q,q],[s,q,q,q,q,s,q,q,q,s],[s,s],[s,q,q,q,q,s],[q,q,q,s],[q,t,q,t,q,t,q],[q,q,t,q,s,q,t,q,q],[s,t,t,t,s]];this.aArraysItems=[],this.levelAmplitude=0,this.levelPositionY=0,this.init=function(a,b,c){function d(){var a=new LevelTile;a.init(t,D,F,h,i,u.levelAmplitude,H[J]),a.y=-u.levelAmplitude,a.visible=!1,u.addChildAt(a,0),m[J]=a,n[J]=J,J++,J>=I?j():d()}function j(){o=m[0],o.visible=!0,p=m[1],p.visible=!0,p.x=o.x+h,l=m.length,D.destroy(),F.destroy()}function k(a,b,c){var d=[],e=t.display.getAllKeysScaled(a,t.options.scaleAssets),f=e.length,g=0;for(g;f>g&&!(g>=b);g++){var h=new Item;h.init(t,e[g],a,c),d[d.length]=h,u.addChild(h),h.forceKill()}return d}var t=a.game;switch(Phaser.Image.call(this,t),e=e*t.options.scaleAssets<<0,t.options.config.gameplay){case"jump":f=1600;break;case"roadTrip":f=1e4;break;default:f=3200}g=t.options.gameWidth,f=f*t.options.scaleAssets<<0;var w=t.display.getImageScaled("ground",t.options.scaleAssets),x=w.width>>0,y=w.height>>0,z=t.display.getImageScaled("road",t.options.scaleAssets),A=z.height>>0,B=t.options.logicalWidth*t.options.scaleAssets*b*1.2<<0;for(Phaser.Math.isOdd(y)&&(y-=1),Phaser.Math.isOdd(A)&&(A-=1);B>h;)h+=x;this.levelAmplitude=.4*t.options.logicalHeight*t.options.scaleAssets<<0,i=2*this.levelAmplitude,this.levelPositionY=t.options.isMobile?i:this.levelAmplitude;var C=0,D=new Phaser.BitmapData(t,"testGround",h,i),E=Math.ceil(i/y)+1;for(C;E>C;C++)D.textureLine(new Phaser.Line(0,C*y,h,C*y),w.key,"repeat");var F=new Phaser.BitmapData(t,"testRoad",h,i),G=Math.ceil(i/A)+1;for(C=0;G>C;C++)F.textureLine(new Phaser.Line(0,C*A,h,C*A),z.key,"repeat");var H=[[{x:0,y:.5},{x:.25,y:.8},{x:.75,y:.2},{x:1,y:.5}],[{x:0,y:.5},{x:.5,y:.9},{x:1,y:.5}],[{x:0,y:.5},{x:.5,y:0},{x:1,y:.5}],[{x:0,y:.5},{x:.25,y:.3},{x:.5,y:.8},{x:.75,y:.3},{x:1,y:.5}],[{x:0,y:.5},{x:.5,y:0},{x:.7,y:.85},{x:1,y:.5}]];t.options.isMobile||H.push([{x:0,y:.5},{x:.3,y:.7},{x:.6,y:.9},{x:.8,y:0},{x:1,y:.5}],[{x:0,y:.5},{x:.2,y:.4},{x:.4,y:.6},{x:.6,y:.4},{x:.8,y:.6},{x:1,y:.5}],[{x:0,y:.5},{x:.2,y:.2},{x:.7,y:.5},{x:.8,y:.7},{x:1,y:.5}],[{x:0,y:.5},{x:.4,y:.1},{x:.8,y:.8},{x:1,y:.5}]);var I=H.length,J=0,K="jump"==t.options.config.gameplay,L=0,M=0,N=v.length;for(C=0;N>C;C++){var O=v[C],P=O.length,Q=0,R=0,S=0;for(S;P>S;S++){var T=O[S];T==q?Q++:T==s&&(K?R++:Q++)}Q>L&&(L=Q),R>M&&(M=R)}var U=K?-c-20*t.options.scaleAssets<<0:0;this.aArraysItems[q]=k("coin",2*L,U),this.aArraysItems[r]=k("multiplicator",1,0),this.aArraysItems[s]=k("obstacle",2*M,20*t.options.scaleAssets<<0),d()},this.move=function(b){if(d+=b,o.x<p.x){o.x-=b;var i=o.x+h;if(p.x=i,0>i){var j=p.x+h;o.visible=!1,o=c(),o.visible=!0,o.x=j}}else{p.x-=b;var j=p.x+h;if(o.x=j,0>j){var i=o.x+h;p.visible=!1,p=c(),p.visible=!0,p.x=i}}if(g+=b,g>f){g=0;for(var l=0,m=v[this.game.rnd.integerInRange(0,v.length-1)],n=m.length,q=0;n>q;q++)a(m[q],l),l+=e;k++,k>10&&(k=0,a(r,l))}},this.getPosY=function(a){var b;return b=a>=o.x&&a<o.x+h?o:p,-this.levelPositionY+b.getPosition(a)},this.placeItemOnTheRoad=function(a){var b=a.posX,c=b>o.x&&b<=o.x+o.levelWidth?o:p,d=b-c.x,e=b+1-c.x,f=-this.levelAmplitude+c.aPositions[d<<0],g=-this.levelAmplitude+c.aPositions[e<<0];a.visible=!0,a.isOnTheRoad=!0,a.x=b,a.y=f-a.midH+a.gapY,a.rotation=-Math.atan(f-g)}};LevelGenerator.prototype=Object.create(Phaser.Image.prototype),LevelGenerator.prototype.constructor=LevelGenerator;var LevelTile=function(){};LevelTile.prototype=Object.create(Phaser.Image.prototype),LevelTile.prototype.constructor=LevelTile,LevelTile.prototype.aPositions,LevelTile.prototype.levelWidth,LevelTile.prototype.init=function(a,b,c,d,e,f,g){Phaser.Image.call(this,a,0,0);var h,i=g.length,j=0;for(j;i>j;j++)h=g[j],h.x*=d,h.y*=f;this.aPositions=this.generateSin(g),this.levelWidth=d;var k=new Phaser.Graphics(a),l=new Phaser.Graphics(a),m=20*a.options.scaleAssets<<0,n=0,o=this.aPositions[0];for(k.beginFill(0),l.beginFill(0),k.moveTo(0,o),l.moveTo(0,o),i=d,j=8;i>j;j+=8)n=this.aPositions[j],k.lineTo(j,n),l.lineTo(j,n);for(n=this.aPositions[i-1],k.lineTo(i,n),l.lineTo(i,n),l.lineTo(i,n+m),j=i-1;j>8;j-=8)l.lineTo(j,this.aPositions[j]+m);l.lineTo(0,o+m),l.lineTo(0,o),l.endFill(),k.lineTo(i,e),k.lineTo(0,e),k.lineTo(0,o),k.endFill();var p=new Phaser.Image(a,0,0,k.generateTexture()),q=p.height,r=e-q,s=new Phaser.Image(a,0,0,l.generateTexture()),t=s.height,u=r,v=new Phaser.BitmapData(a,"levelGround",d,e);v.alphaMask(b,p,null,new Phaser.Rectangle(0,r,d,q));var w=new Phaser.BitmapData(a,"levelRoad",d,e);w.alphaMask(c,s,null,new Phaser.Rectangle(0,u,d,t));var x=new Phaser.BitmapData(a,"levelAll",d,e);try{x.draw(v),x.draw(w)}catch(y){}var z=new Phaser.Image(a,0,0,x);this.addChild(z),p.destroy(),s.destroy(),v.destroy(),w.destroy();var A=a.display.getAllImagesScaled("decor",a.options.scaleAssets);if(null!=A&&A.length>0){var B=A.length;for(j=0;2>j;j++){var C=A[a.rnd.integerInRange(0,B-1)];C.x=a.rnd.integerInRange(.1*d,.9*d),C.y=this.aPositions[C.x]+20*a.options.scaleAssets<<0,C.anchor.set(.5,1),this.addChildAt(C,0)}}},LevelTile.prototype.getPosition=function(a){return this.aPositions[-this.x+a<<0]},LevelTile.prototype.generateSin=function(a){var b,c,d,e,f,g,h,i=0,j=0,k=a.length,l=Math.PI,m=Math.cos,n=[];for(i;k>i;i++)if(b=a[i],k>i+1)for(c=a[i+1],d=c.x-b.x,j=0;d>j;j++)e=b.y+c.y>>1,f=b.y-c.y>>1,g=l/d,h=e+f*m(g*j),h=(100*h<<0)/100,n[n.length]=h;return n};var Engine=function(a){function b(){R=!0}function c(){R=!1}function d(){return R||F.space.isDown||F.down.isDown}function e(){return R||F.space.isDown||F.up.isDown||F.down.isDown||F.left.isDown||F.right.isDown}function f(){return Da>6&&!L&&(R||F.space.isDown||F.up.isDown||F.down.isDown)}function g(){var b=1,c=.1;J=Ga(),J?(0>ra&&(ra=ma),b=ga,c=ha,xa=ia,ya=ja):(xa=ka,ya=la),T=xa;var d=E.getPosY(u),e=0!=ra&&d<<0>=W;if(e)X++,X>8&&(y.pause(),N=!1),ra+=ma*b,W+=ra,Y>W&&(W=Y),0>V?(V+=.02,V>0&&(V=0)):V>0&&(V-=.02,0>V&&(V=0));else{N=!0,y.resume();var f=d-E.getPosY(u+1);ra=0,0>=f?qa+=na*c:(qa-=oa*c,0>qa&&(qa=xa),X>16&&(qa*=.5,J&&a.camera.shake(.01,150)),!J&&qa>pa&&.7>f&&(ra=-f*qa)),X=0,xa>qa?qa+=T:qa>ya*_&&(qa=ya*_),W=E.getPosY(u+qa),V=Math.atan(-f)}D.rotation+=.2*(V-D.rotation),A.update(u,D.y,qa,qa/ya)}function h(){var b=E.getPosY(u),c=0!=ra&&b<<0>=W;if(c)X++,ra+=ma,W+=ra,Y>W?W=Y:W>E.getPosY(u+qa)+1&&(W=E.getPosY(u+qa)+1),X>8&&(y.pause(),N=!1,J=Ga(),J?(K||(sa=D.rotation),K=!0,va=.1,V+=ua,V>2.8&&ta++,V>6.28319&&(V-=6.28319)):K?(va>0&&(va-=.005,0>va&&(va=0)),V+=va):0>V?(V+=.02,V>0&&(V=0)):V>0&&(V-=.02,0>V&&(V=0)),D.rotation=V);else{N=!0,y.resume(),K=!1;var d=b-E.getPosY(u+1),e=Math.atan(-d);if(X>8){var f=V;f>3.14159?f=6.28319-f:-3.14159>f&&(f=6.28319+f);var g=d+f,h=g>1.4||-1.4>g;if(h)qa=0,D.blink(),a.camera.shake(.01,150);else if(ta>0){var i=.4>g&&g>-.4;i?(qa=ya*ba*ta,_=ba):(qa=ya*aa,_=aa)}}0>=d?(qa+=na,ra=0):(qa+=oa,qa>2&&.7>d&&(ra=-d*qa,wa>ra&&(ra=wa))),ta=0,X=0,xa>qa?qa+=T:qa>ya*_&&(qa=ya*_),W=E.getPosY(u+qa),V=e,D.rotation=V}A.update(D.x,D.y,qa,qa/ya-1)}function i(){J=Ga(),J&&(Da=0,L=!0,ra=-Fa);var a=E.getPosY(u);if(L)X++,X>2&&(N=!1),ra+=ma,W+=ra,W>a<<0&&(L=!1),0>V?(V+=.02,V>0&&(V=0)):V>0&&(V-=.02,0>V&&(V=0));else{N=!0,Da++;var b=a-E.getPosY(u+1);ra=0,qa+=oa,xa>qa?qa+=T:qa>ya*_&&(qa=ya*_),X=0,W=E.getPosY(u+qa),V=Math.atan(-b)}D.rotation+=.2*(V-D.rotation)}function j(){$++,D.y=W-D.midH;var b=D.x,c=n?D.y+E.levelAmplitude:D.y,d=D.collisionW,e=D.collisionH,f=0,g=0,h=E.aArraysItems,i=h.length;for(f;i>f;f++){var j=h[f],k=j.length;for(g=0;k>g;g++){var l=j[g];if(l.alive){l.posX-=qa;var o=l.posX;if(l.isOnTheRoad){if(o<-l.midW){l.forceKill();continue}if(!l.isCollide&&G>o){var p=o,q=l.y,r=l.midW,s=l.midH;if(b+d>p-r&&p+r>b-d&&c+e>q-s&&q+s>c-e)switch(l.strategy){case"coin":M?(H+=2,y.addTime(2*fa)):(H++,y.addTime(fa)),y.showCoins(H),l.collide();break;case"obstacle":L||(I++,qa=0,D.blink(),a.camera.shake(.01,150),l.collide(),this.countObstacle++,this.countObstacle>=za&&(this.countObstacle=0,Aa>xa&&(xa+=Ba,ya+=Ba)));break;case"multiplicator":M=!0,da=0,y.showMultiplicator(!0),l.collide()}}l.animate(),l.x=o}else o<t+l.midW&&E.placeItemOnTheRoad(l)}}}M&&(da++,da>ea&&(M=!1,y.showMultiplicator(!1)));var u=qa/ya;if(D.update(J,N,u),_>1&&(_-=ca,1>_&&(_=1)),B.move(qa),E.move(qa),m(),U+=qa,Z++,8==Z)y.showDistance(.01*U<<0);else if(Z>=16){Z=0;var v=$/60<<0,w=.01*U<<0;y.showScore(H*Ea+w+v<<0)}}function k(){Q=!0;var b=$/60<<0,c=.01*U<<0,d={calculatedScore:2147483648<<0,nCoins:400000*H<<0,nMalus:I<<0,time:3000000*b,totalDistance:100000*c};y.showScore(H*Ea+c+b<<0),a.services.endGame(d),D.backToNormal();var e=0,f=0,g=E.aArraysItems,h=g.length;for(e;h>e;e++){var i=g[e],j=i.length;for(f=0;j>f;f++){var k=i[f];k.collide()}}var l=function(){qa-=.14,0>qa&&(qa=0,D.stopAnimsAndSound(),a.audio.stop("audio_theme",500));var b=E.getPosY(u),c=0!=ra&&b<<0>W;if(c)ra+=ma,W+=ra,W>b<<0&&(L=!1);else{ra=0,W=E.getPosY(u+qa);var d=b-E.getPosY(u+1),i=Math.atan(-d);V=i,D.rotation+=.2*(V-D.rotation)}for(D.y=W-D.midH,B.move(qa),E.move(qa,u),e=0;h>e;e++){var j=g[e],k=j.length;for(f=0;k>f;f++){var l=j[f];l.animate(),l.x<-l.midW&&l.kill()}}if("jump"!=s&&A.update(D.x,D.y,qa,qa/ya-1),P){var m=v*(1- -W/q);w>m&&(m=w),x+=.2*(m-C.scale.x),C.scale.set(x)}},m=function(){o?(a.state.clearCurrentState(),a.state.start("Engine",!0,!1)):TweenMax.delayedCall(1,a.services.changePage,null,a.services)},n=function(){z.playMessage(["gameOver"],2,"scale",m,null)};TweenMax.to(this,3.6,{onUpdate:l,onComplete:n,callbackScope:this})}function l(){a.services.startGame(),D.playAnimsAndSound(),a.audio.play("audio_theme"),y.start(k,this),Q=!1,O=!0}function m(){if(P){var a=v*(1- -W/q);w>a&&(a=w),x+=.14*(a-C.scale.x),C.scale.set(x)}}var n=a.options.isMobile,o=a.options.isBoxInterface,p=a.options.scaleAssets,q=a.options.gameHeight,r=a.options.gameWidth>>1,s=a.options.config.gameplay,t=0,u=100*p<<0,v=1,w=.6,x=v,y=null,z=null,A=null,B=null,C=null,D=null,E=null,F=null,G=0,H=0,I=0,J=!1,K=!1,L=!1,M=!1,N=!1,O=!1,P=!0,Q=!0,R=!1,S=null,T=.1,U=0,V=0,W=0,X=0,Y=0,Z=0,$=0,_=1,aa=1.2,ba=2,ca=.02,da=0,ea=480,fa=.12,ga=5,ha=4,ia=(2.4*p*100<<0)/100,ja=(32*p*100<<0)/100,ka=(3*p*100<<0)/100,la=(26*p*100<<0)/100,ma=(.4*p*100<<0)/100,na=(.3*p*100<<0)/100,oa=(.3*p*100<<0)/100,pa=(16*p*100<<0)/100,qa=9*p,ra=5*p,sa=0,ta=0,ua=.16,va=0,wa=(-20*p*100<<0)/100,xa=(1*p*100<<0)/100,ya=(20*p*100<<0)/100,za=3,Aa=(12*p*100<<0)/100,Ba=(.3*p*100<<0)/100,Ca=-(100*p)<<0,Da=0,Ea=100,Fa=(14*p*100<<0)/100,Ga=null,Ha=null;Engine.prototype.create=function(){a.input.maxPointers=1,a.device.desktop&&!o&&a.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR,Phaser.Keyboard.UP,Phaser.Keyboard.DOWN,Phaser.Keyboard.LEFT,Phaser.Keyboard.RIGHT]),B=new Background,B.init(this);var j=1+(1-w);x=v,C=new Phaser.Sprite(a),C.y=n&&"jump"==s?q+110*a.options.scaleY<<0:q,a.add.existing(C),t=n?a.options.gameWidth*j*1.2<<0:810*j*1.2<<0,D=new Hero,D.init(this),D.x=u,E=new LevelGenerator,E.init(this,j,D.getRealHeight()),C.addChild(E),n&&(E.y=-E.levelPositionY>>1);var k=E.getPosY(u),m=k-E.getPosY(u+1);switch(D.rotation=Math.atan(-m),D.y=k-D.midH,W=k,A=new FX,A.init(this,C,D.midW,D.midH),C.addChild(D),G=u+D.width,Y=-(q*j+D.height)<<0,O=!1,T=.1,U=0,Q=!0,V=0,W=0,X=0,r=a.options.gameWidth>>1,_=1,aa=1.2,ba=2,ca=.02,s){case"tinyWings":Ea=100,P=!0,fa=.1,ga=5,ha=4,ia=(2.4*p*100<<0)/100,ja=(32*p*100<<0)/100,ka=(3*p*100<<0)/100,la=(26*p*100<<0)/100,ma=(.4*p*100<<0)/100,na=(.3*p*100<<0)/100,oa=(.3*p*100<<0)/100,pa=(16*p*100<<0)/100,qa=9*p,ra=5*p,o||(F=n||a.options.isTouchMode?{down:{isDown:!1},space:{isDown:!1}}:a.input.keyboard.addKeys({down:Phaser.KeyCode.DOWN,space:Phaser.KeyCode.SPACEBAR})),Ga=d,Ha=g;break;case"roadTrip":Ea=10,P=!0,fa=.06,K=!1,ta=0,ua=.16,va=0,wa=(-20*p*100<<0)/100,ma=(.2*p*100<<0)/100,na=(.8*p*100<<0)/100,oa=(.1*p*100<<0)/100,qa=0,ra=(5*p*100<<0)/100,xa=(1*p*100<<0)/100,ya=(20*p*100<<0)/100,o||(F=n||a.options.isTouchMode?{up:{isDown:!1},down:{isDown:!1},space:{isDown:!1},left:{isDown:!1},right:{isDown:!1}}:a.input.keyboard.addKeys({up:Phaser.KeyCode.UP,down:Phaser.KeyCode.DOWN,space:Phaser.KeyCode.SPACEBAR,left:Phaser.KeyCode.LEFT,right:Phaser.KeyCode.RIGHT})),Ga=e,Ha=h;break;case"jump":Ea=100,P=!1,fa=.1,za=3,Aa=(12*p*100<<0)/100,Ba=(.3*p*100<<0)/100,Ca=-(100*p)<<0,Da=0,Fa=(14*p*100<<0)/100,ma=(.8*p*100<<0)/100,oa=.2,qa=(3*p*100<<0)/100,ra=(5*p*100<<0)/100,L=!1,xa=(3*p*100<<0)/100,ya=Aa,o||(F=n?{up:{isDown:!1},down:{isDown:!1},space:{isDown:!1}}:a.input.keyboard.addKeys({up:Phaser.KeyCode.UP,down:Phaser.KeyCode.DOWN,space:Phaser.KeyCode.SPACEBAR})),Ga=f,Ha=i}n&&(P?B.positionTilesY(a.options.gameHeight-E.levelAmplitude*w+110*a.options.scaleY<<0):B.positionTilesY(a.options.gameHeight-E.levelAmplitude+110*a.options.scaleY<<0)),Z=0,y=new Hud,y.init(this),a.add.existing(y),z=new ADFW_Message,z.init(this),a.add.existing(z),z.playMessage("intro",a.options.isLocalDev?.1:1,"scale",l,null),$=0,o?(a.portal.checkPauseStatus(),Ga=function(){switch(s){case"tinyWings":Ga=function(){var a=E.getPosY(u),b=0!=ra&&a<<0>=W,c=a-E.getPosY(u+1);if(b){if(X++,X>64&&0>=c)return!0}else if(0>=c)return!0;return!1};break;case"roadTrip":Ga=function(){var a=E.getPosY(u),b=0!=ra&&a<<0>=W;return b&&(X++,5>ta&&X>52)?!0:!1};break;case"jump":Ga=function(){if(L)return!1;var a=D.collisionW,b=0,c=0,d=E.aArraysItems,e=d.length;for(b;e>b;b++){var f=d[b],g=f.length;for(c=0;g>c;c++){var h=f[c];if(h.alive&&(h.animate(),"obstacle"==h.strategy&&h.alive&&!h.isCollide&&h.posX<u+3*a))return!0}}return!1}}}):(S=new Phaser.Sprite(this.game,0,0),S.hitArea=new Phaser.Rectangle(0,0,a.options.gameWidth,a.options.gameHeight),S.inputEnabled=!0,S.fixedToCamera=!0,R=!1,S.events.onInputDown.add(b,this),S.events.onInputUp.add(c,this),a.add.existing(S)),C.scale.set(x),a.audio.add("audio_theme",!0),a.audio.addButtonOnStage()},Engine.prototype.update=function(){O&&!Q&&(Ha(),j())}};
