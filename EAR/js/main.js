AFRAME.registerComponent('input-listen', {
    init:
        function () {
            //Declaration and initialization of flag 
            //which exprains grip button is pressed or not.
            //"this.el" reffers ctlR or L in this function
            this.el.grip = false;

            //Called when trigger is pressed 
            this.el.addEventListener('triggerdown', function (e) {
                //"this" reffers ctlR or L in this function
                var point = this.object3D.getWorldPosition();

                //txt.setAttribute("value",point.x.toFixed(2)+","+point.y.toFixed(2)+","+point.z.toFixed(2));

                //Creating ball entity.
                var ball = document.createElement('a-sphere');
                ball.setAttribute('class', 'ball');
                ball.setAttribute('scale', '0.2 0.2 0.2');
                ball.setAttribute('position', point);
                ball.setAttribute('dynamic-body', 'shape: sphere; sphereRadius:0.2; ');
                ball.setAttribute('sound', 'src: snd/radar.mp3; autoplay: true;');


                //Getting raycaster which was attached to ctrlR or L
                var dir = this.getAttribute("raycaster").direction;

                //Setting shoot dierction and speed 
                var force = new THREE.Vector3(dir.x, dir.y, dir.z);
                force.multiplyScalar(2000);                   
                ball.force = this.object3D.localToWorld(force);

                //Instantiate ball entity in a-scene
                var scene = document.querySelector('a-scene');
                scene.appendChild(ball);

                //shoot "ball" after physics information getting ready. 
                ball.addEventListener('body-loaded', function (e) {
                    //"this" reffers ball entity in this function
                    var p = this.object3D.position;
                    //this.velocity was calculated before this function is called.
                    var f = this.force;
                    this.body.applyForce(
                        new CANNON.Vec3(f.x, f.y, f.z),
                        new CANNON.Vec3(p.x, p.y, p.z)
                    );
                });
            });

            //Grip Pressed
            this.el.addEventListener('gripdown', function (e) {
                //Setting grip flag as true.
                this.grip = true;
            });
            //Grip Released
            this.el.addEventListener('gripup', function (e) {
                //Setting grip flag as false.
                this.grip = false;
            });

            //Raycaster intersected with something.
            this.el.addEventListener('raycaster-intersection', function (e) {
                //Store first selected object as selectedObj 
                this.selectedObj = e.detail.els[0];
            });
            //Raycaster intersection is finished.
            this.el.addEventListener('raycaster-intersection-cleared', function (e) {
                //Clear information of selectedObj
                this.selectedObj = null;
            });

            //A-buttorn Pressed 
            this.el.addEventListener('abuttondown', function (e) {
                //Aqurire all ball entities which are instantiated in a-scene
                var els = document.querySelectorAll('.ball');
                //Destroy all ball entities
                for (var i = 0; i < els.length; i++) {
                    els[i].parentNode.removeChild(els[i]);
                }
            });

            //X-buttorn Pressed 
            this.el.addEventListener('xbuttondown', function (e) {
                //Start pointing position to teleport  
                this.emit('teleportstart');
            });

            //X-buttorn Released 
            this.el.addEventListener('xbuttonup', function (e) {
                //Jump to pointed position
                this.emit('teleportend');
            });

            //console.log(this);
        },

    //called evry frame.
    tick: function () {

        if (!this.el.selectedObj) { return; }
        if (!this.el.grip) { return; }
      
        //Getting raycaster component which is attatched to ctlR or L
        //this.el means entity of ctlR or L in this function.
        var ray = this.el.getAttribute("raycaster").direction;
        //setting tip of raycaster as 1.1m forward of controller.  
        var p = new THREE.Vector3(ray.x, ray.y, ray.z);
        p.normalize();
        p.multiplyScalar(1.2);
        //Convert local position into world coordinate.
        this.el.object3D.localToWorld(p);
        //Move selected object to follow the tip of raycaster.
        this.el.selectedObj.object3D.position.set(p.x, p.y, p.z);
    }
});


// explain
// https://aframe.io/docs/1.2.0/introduction/entity-component-system.html

/* <a-entity foo="bar: 5; baz: bazValue"></a-entity> */

// AFRAME.registerComponent('foo', {
//     schema: {
//       bar: {type: 'number'},
//       baz: {type: 'string'}
//     },
  
//     init: function () {
//       // Do something when component first attached.
//     },
  
//     update: function () {
//       // Do something when component's data is updated.
//     },
  
//     remove: function () {
//       // Do something the component or its entity is detached.
//     },
  
//     tick: function (time, timeDelta) {
//       // Do something on every scene tick or frame.
//     }
//   });

//   AFRAME.registerComponent('fool', {
//     init: function () {
//       console.log(this.el.sceneEl);  // Reference to the scene element.
//     }
//   });



//   document.querySelector('a-cylinder').addentListener('collide', function (evt) {
//     console.log('This A-Frame entity collided with another entity!');
//   });


//   AFRAME.registerComponent('emitlog', {
//     schema: {
//       color: {default: 'red'}
//     },

//     init: function () {
//       var data = this.data;
//       var el = this.el;  // <a-box>
//       var defaultColor = el.getAttribute('material').color;
//       el.addentListener('collide', function (evt) {
//         console.log(this.el + ', This A-Frame entity collided with another entity!');
//       });
    


//       el.addEventListener('mouseenter', function () {
//         el.setAttribute('color', data.color);
//       });

//       el.addEventListener('mouseleave', function () {
//         el.setAttribute('color', defaultColor);
//       });
//     }
//   });

var prevpos = {x: 0, y: 0, z: 0, theta:0, speed:0, count:0, distfromgoal: 500};


AFRAME.registerComponent('update', {
    init: function () {
      // Set up throttling.
      this.throttledFunction = AFRAME.utils.throttle(this.everySecond, 1000, this);
      
    },
  
    everySecond: function () {
      // Called every second.
      // AFRAME.utils.entity.getComponentProperty(entity, 'geometry');
      var cam = document.querySelector('#cameraRig');
      var pos = AFRAME.utils.entity.getComponentProperty(cam, 'position');
      console.log(pos)

    //   if (currentwaypoint == 0) {
    //     var radarpos = AFRAME.utils.entity.getComponentProperty(radar1, 'position');
    //   } else if (currentwaypoint == 1) {
    //     var radarpos = AFRAME.utils.entity.getComponentProperty(radar2, 'position');
    //   }
      
    //   var sound = document.querySelector('#'+ waypoints[0]);
    //   var x = prevpos.x - pos.x;
    //   var z = prevpos.z - pos.z;
    //   var theta = Math.tan(x/z).toFixed(4);
    //   var speed = Math.sqrt(x*x + z*z);
    //   var distradar = Math.sqrt(Math.pow((pos.x-radarpos.x), 2) + Math.pow((pos.z-radarpos.z), 2))
    //   $('#distsensor').html(distradar);
    //   // console.log(theta);
      
    //   if (speed > 0){
    //     if (distradar > prevpos.distfromgoal) {
    //       console.log ("going away");
    //       var sound = document.querySelector('#'+ waypoints[currentwaypoint]);
    //       sound.components.sound.stopSound();
    //       var sound = document.querySelector('#'+ farwaypoints[currentwaypoint]);
    //     } else {
    //       console.log("coming closer");
    //       var sound = document.querySelector('#'+ farwaypoints[currentwaypoint]);
    //       sound.components.sound.stopSound();
    //       var sound = document.querySelector('#'+ waypoints[currentwaypoint]);
    //     }
    //     if (prevpos.theta == theta){
    //       prevpos.count = prevpos.count + 1;
    //       if (prevpos.count > 2){ 
    //         sound.components.sound.playSound();
    //       }
    //       } else {
    //       prevpos.count = 0;
    //     } 
    //   }
    //   if (speed == 0){
    //     prevpos.count = 0;
    //     sound.components.sound.stopSound();
    //   }

    //   if (distradar < 20){
    //     if (currentwaypoint == 0) {
    //       currentwaypoint = 1;
    //       console.log("changing waypoint")
    //       sound.components.sound.stopSound();
    //       $('#messages').html("deze was gemakkelijk, kan je de volgende ook vinden?");

    //     } else if (currentwaypoint == 1) {
    //       var done = document.querySelector('#done');
    //       done.setAttribute('visible', 'true');
    //       done.components.sound.playSound();
    //       sound.components.sound.stopSound();
    //       $('#messages').html("goed gedaan. Als je nog eens wil proberen, ververs dan pagina");
    //     }
    //   }


      console.log(prevpos);
      prevpos.x = pos.x;
      prevpos.z = pos.z;
    //   prevpos.theta = theta;
    //   prevpos.speed = speed;
    //   prevpos.distfromgoal = distradar;
    },
  
    tick: function (t, dt) {
      this.throttledFunction();  // Called once a second.
      // console.log("A frame passed.");  // Called every frame.
     }
  });