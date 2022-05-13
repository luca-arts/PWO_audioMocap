
//
var config = {"debug": true, "handdebug": true, "help":false}
var audioconfig = { "target": {
                      "distanceModel": "exponential",
                      "maxDistance": 100,
                      "positional": true,
                      "refDistance": 1,
                      "rolloffFactor":1,
                      "volume": 1},
                    "background":{
                      "distanceModel": "linear",
                      "maxDistance": 100,
                      "positional": true,
                      "refDistance": 1,
                      "rolloffFactor":1
                      }
                  } 
// https://aframe.io/docs/1.2.0/components/sound.html#properties

var state = { "currentlevel": 0, "currentwaypoint": 0, "currenthelp": 0}
var world = { "levels": [ 
                          {"level": "Welkom", 
                            "startpos": [0,1.8,0], 
                            "backdrop":"img/back1.png",
                            "size": [15,15],
                            "waypoints": [{"name": "target1", 
                                        "position": [6,1.8,-7], 
                                        "type":"target", 
                                        "sound": "src: #portal; autoplay: true; loop:true;",
                                        "unlockevent": "levelDone"
                                      }], 
                           "backgroundsounds" : [
                              {"name": "b1", "position": [2,1.8,2], "sound": "src: #back01;  autoplay: true; loop:true; volume: 0.1;"},
                              {"name": "b2", "position": [-2,1.8,2], "sound": "src: #back02; autoplay: true; loop:true; volume: 0.1;"},
                              {"name": "b3", "position": [2,1.8,-2], "sound": "src: #back03;  autoplay: true; loop:true; volume: 0.1;"},
                              {"name": "b4", "position": [-2,1.8,-2], "sound": "src: #back04;  autoplay: true; loop:true; volume: 0.1;"},

                            ],
                            "objects": [{"name": "light1",
                                        "position": [0,3,0],
                                        "type": "light",
                                        "light": "type:point; intensity:15; distance: 5; decay:2;  color: #AA0000;"},
                                        {"name": "light2",
                                        "position": [6,3,-7],
                                        "type": "light",
                                        "light": "type:point; intensity:13; distance: 5; decay:2;  color: #AA0000;"},
                                        {"name": "box1",
                                        "position": [6,0,-7],
                                        "type": "geometry",
                                        "geometry": "primitive: box",
                                        "material": "color: #AA00AA;"}
                                      ]           
                          },

                          {"level": "It's getting dark",
                            "startpos": [0,1.8,0],
                            "backdrop":"img/back2.png",
                            "size": [15,15],
                            "waypoints": [{"name": "target1", 
                                        "position": [6,1.8,7], 
                                        "type":"target", 
                                        "sound": "src: #lopulse; autoplay: true; loop:true;", 
                                        "unlockevent": "waypointDone"},

                                        {"name": "target2", 
                                          "position": [-6,1.8,-7], 
                                          "type":"target", 
                                          "sound": "src: #portal; autoplay: false; loop:true;", 
                                          "unlockevent": "levelDone"} 
                                        
                                      ],
                            "backgroundsounds" : [
                                        {"name": "b1", "position": [2,1.8,2], "sound": "src: #back05;  autoplay: true; loop:true; volume: 0.2;"},
                                        {"name": "b2", "position": [-2,1.8,2], "sound": "src: #back06; autoplay: true; loop:true; volume: 0.2;"},
                                        {"name": "b3", "position": [2,1.8,-2], "sound": "src: #back07;  autoplay: true; loop:true; volume: 0.2;"},
                                        {"name": "b4", "position": [-2,1.8,-2], "sound": "src: #back08;  autoplay: true; loop:true; volume: 0.2;"},
          
                                      ],
                            "objects": [{"name": "light1",
                                      "position": [0,3,0],
                                      "type": "light",
                                      "light": "type:point; intensity:15; distance: 5; decay:2;  color: #AAAA00;"},
                                      {"name": "light2",
                                      "position": [6,3,7],
                                      "type": "light",
                                      "light": "type:point; intensity:13; distance: 5; decay:2;  color: #AAAA00;"},
                                      {"name": "box1",
                                      "position": [6,0,7],
                                      "type": "geometry",
                                      "geometry": "primitive: box",
                                      "material": "color: #AAAAAA;"}
                                    ]                 
                          }, 
                          {"level": "It's getting darker",
                          "startpos": [5,1.8,1],
                          "backdrop":"img/back2.png",
                          "size": [20,20],

                          "waypoints": [{"name": "target1", 
                                        "position": [3,0,2], 
                                        "type":"target", 
                                        "sound": "src: #lopulse; autoplay: true; loop:true;", 
                                        "unlockevent": "waypointDone"},

                                        {"name": "target2", 
                                          "position": [3,1,2], 
                                          "type":"target", 
                                          "sound": "src: #weirdchord; autoplay: false; loop:true;", 
                                          "unlockevent": "waypointDone"},

                                          {"name": "target3", 
                                          "position": [3,3,2], 
                                          "type":"target", 
                                          "sound": "src: #portal; autoplay: false; loop:true;", 
                                          "unlockevent": "levelDone"} 
                          
                                        ],
                            "backgroundsounds" : [
                                      {"name": "b1", "position": [2,1.8,2], "sound": "src: #back05;  autoplay: true; loop:true; volume: 0.3;"},
                                      {"name": "b2", "position": [-2,1.8,2], "sound": "src: #back06; autoplay: true; loop:true; volume: 0.3;"},
                                      {"name": "b3", "position": [2,1.8,-2], "sound": "src: #back07;  autoplay: true; loop:true; volume: 0.3;"},
                                      {"name": "b4", "position": [-2,1.8,-2], "sound": "src: #back08;  autoplay: true; loop:true; volume: 0.3;"},

                        ],
                            "objects": [{"name": "light1",
                                      "position": [0,3,0],
                                      "type": "light",
                                      "light": "type:point; intensity:15; distance: 5; decay:2;  color: #AAAAAA;"},
                                      {"name": "light2",
                                      "position": [6,3,7],
                                      "type": "light",
                                      "light": "type:point; intensity:13; distance: 5; decay:2;  color: #AAAAAA;"},
                                      {"name": "box1",
                                      "position": [6,0,7],
                                      "type": "geometry",
                                      "geometry": "primitive: box",
                                      "material": "color: #AAAAAA;"}
                                    ]     
                          },
                          {"level": "It's pitchblack",
                          "startpos": [5,1.8,1],
                          "backdrop":"img/back2.png",
                          "size": [20,20],

                          "waypoints": [{"name": "target1", 
                                        "position": [3,0,2], 
                                        "type":"target", 
                                        "sound": "src: #lopulse; autoplay: true; loop:true;", 
                                        "unlockevent": "waypointDone"},

                                        {"name": "target2", 
                                          "position": [3,1,2], 
                                          "type":"target", 
                                          "sound": "src: #weirdchord; autoplay: false; loop:true;", 
                                          "unlockevent": "waypointDone"},

                                          {"name": "target3", 
                                          "position": [2,1,2], 
                                          "type":"target", 
                                          "sound": "src: #sinethriller; autoplay: false; loop:true;", 
                                          "unlockevent": "waypointDone"},

                                          {"name": "target4", 
                                          "position": [3,1,3], 
                                          "type":"target", 
                                          "sound": "src: #portal; autoplay: false; loop:true;", 
                                          "unlockevent": "levelDone"}
                          
                                        ],
                            "backgroundsounds" : [
                                      {"name": "b1", "position": [2,1.8,2], "sound": "src: #back05;  autoplay: true; loop:true; volume: 0.3;"},
                                      {"name": "b2", "position": [-2,1.8,2], "sound": "src: #back06; autoplay: true; loop:true; volume: 0.3;"},
                                      {"name": "b3", "position": [2,1.8,-2], "sound": "src: #back07;  autoplay: true; loop:true; volume: 0.3;"},
                                      {"name": "b4", "position": [-2,1.8,-2], "sound": "src: #back08;  autoplay: true; loop:true; volume: 0.3;"},

                        ],
                            "objects": [{"name": "light1",
                                      "position": [0,3,0],
                                      "type": "light",
                                      "light": "type:point; intensity:15; distance: 5; decay:2;  color: #AAAAAA;"},
                                      {"name": "light2",
                                      "position": [6,3,7],
                                      "type": "light",
                                      "light": "type:point; intensity:13; distance: 5; decay:2;  color: #AAAAAA;"},
                                      {"name": "box1",
                                      "position": [6,0,7],
                                      "type": "geometry",
                                      "geometry": "primitive: box",
                                      "material": "color: #AAAAAA;"}
                                    ]     
                          }

                        ]} ;

var help = {  0: {
                  0: {"left": "this is the lefthandtext", "right": "this is the righthand text" },
                  1: {"left": "otherstuff", "right": "stuff"}
                },
              1: {
                0: {"left": "otherstuff", "right": "stuff"}
              }
            } 

function placeObject(ob){
  // console.log(ob);
  var sceneEl = document.querySelector('a-scene');
  var entityEl = document.createElement('a-entity');
  sceneEl.appendChild(entityEl);
  // console.log("done loading ob", ob.name)
  // state.currentwaypoint = ob.name;
  entityEl.setAttribute('id', ob.name);
  entityEl.setAttribute('class', "dynamic");
  if (ob.type == "light"){
    entityEl.setAttribute('light', ob.light);
  }
  if (ob.type == "geometry"){
    entityEl.setAttribute('geometry', ob.geometry );
    entityEl.setAttribute('material', ob.material );
    entityEl.setAttribute('visible',true );
  }
  entityEl.object3D.position.set(ob.position[0],ob.position[1],ob.position[2]);
}

function placeSound(ob, soundtype){
  // console.log(ob);
  var sceneEl = document.querySelector('a-scene');
  var entityEl = document.createElement('a-entity');
  sceneEl.appendChild(entityEl);
  // console.log("done loading ob", ob.name)
  entityEl.setAttribute('id', ob.name);
  entityEl.setAttribute('class', "dynamic");
  entityEl.setAttribute('sound', ob.sound);
  
  if (soundtype == "background") {
    entityEl.setAttribute("sound", "positional", audioconfig.background.positional);
    entityEl.setAttribute("sound", 'distanceModel', audioconfig.background.distanceModel);
    entityEl.setAttribute("sound","maxDistance", audioconfig.background.maxDistance);
    entityEl.setAttribute("sound","refDistance", audioconfig.background.refDistance);
    entityEl.setAttribute("sound","rolloffFactor", audioconfig.background.rolloffFactor);
    // entityEl.setAttribute("sound","volume", audioconfig.background.volume);
  } else if (soundtype == "target") {
    entityEl.setAttribute("sound", "positional", audioconfig.target.positional);
    entityEl.setAttribute("sound", 'distanceModel', audioconfig.target.distanceModel);
    entityEl.setAttribute("sound","maxDistance", audioconfig.target.maxDistance);
    entityEl.setAttribute("sound","refDistance", audioconfig.target.refDistance);
    entityEl.setAttribute("sound","rolloffFactor", audioconfig.target.rolloffFactor);
    entityEl.setAttribute("sound","volume", audioconfig.target.volume);
  }
  entityEl.object3D.position.set(ob.position[0],ob.position[1],ob.position[2]);
}
function loadLevel(levelid){
  var level = world.levels[levelid]
  console.log(level);
  // 
  //clear dynamic parts
  var sceneEl = document.querySelector('a-scene');
  var els = sceneEl.querySelectorAll('.dynamic');
    for (var i = 0; i < els.length; i++) {
      els[i].parentNode.removeChild(els[i]);
    } 
  var levelgeometry = document.querySelector("#level");
  levelgeometry.setAttribute('src', level.backdrop);
  levelgeometry.setAttribute('width', level.size[0]);
  levelgeometry.setAttribute('height', level.size[1]);

  var player = document.querySelector('#cameraRig');
  console.log(level.startpos);
  player.object3D.position.set(level.startpos[0],level.startpos[1],level.startpos[2]);

  level.waypoints.forEach(function (item){
    if (item.type = "target"){
      placeSound(item,"target");
    }
  });

  level.backgroundsounds.forEach(function (item){
    console.log("placing item", item)
    placeSound(item,"background");
    
  });
  level.objects.forEach(function (item){
      placeObject(item,);
  });

  //set currentwaypoint
  state.currentwaypoint = 0
  console.log("currentwaypoint = ", level.waypoints[state.currentwaypoint]["name"])

  // <a-entity id="target1-1" geometry="primitive: plane" material="color: blue" position="3 0 3" sound="src: #lopulse; autoplay: true; loop:true;"></a-entity>
  // https://aframe.io/docs/1.2.0/introduction/javascript-events-dom-apis.html#updating-multiple-properties-of-a-multi-property-component
  $('#distsensor').html(level.level);

}

function levelDone() {
  console.log("congratz you just finished levbel:", state.currentlevel);
  state.currentlevel = state.currentlevel + 1;  
  loadLevel(state.currentlevel);
}


function waypointDone() {
  var level = world.levels[state.currentlevel]
  document.querySelector('#' + world.levels[state.currentlevel].waypoints[state.currentwaypoint].name).components.sound.stopSound()
  state.currentwaypoint  = state.currentwaypoint + 1;
  console.log("you just unlocked waypoint:", level.waypoints[state.currentwaypoint]["name"]); 
  document.querySelector('#' + world.levels[state.currentlevel].waypoints[state.currentwaypoint].name).components.sound.playSound()
}

let hasPlayed = false;
function handleFirstPlay(event) {
  if(hasPlayed === false) {
    hasPlayed = true;
    // Start whatever you need to do after first playback has started
    var backgroundsound = document.querySelector('backgroundsound1');
    backgroundsound.components.sound.playSound();
  }
}



$( document ).ready(function() {
    console.log( "ready!" );
    // don't run aframe code here
    // use componenents
    
    /// load onboerding level
    // `click` event emitted by browser on mouse click. needed for autoplay!
  document.querySelector('body').addEventListener('click', function (evt) {
    console.log('trying to start backgroundsound!');
    if(hasPlayed === false) {
      hasPlayed = true;
      // Start whatever you need to do after first playback has started
      var backgroundsound = document.querySelector('#backgroundsound1');
      backgroundsound.components.sound.playSound();
    }
  });
});


AFRAME.registerComponent('spawnlevel', {
  init: function () {
    // This will be called after the entity has properly attached and loaded.
    console.log('spawnlevel component!', state.currentlevel);
    loadLevel(state.currentlevel)
    // loadLevel(world.levels[0]);
  }
});
 


AFRAME.registerComponent('input-listen', {
  init:
      function () {
          //Declaration and initialization of flag 
          //which exprains grip button is pressed or not.
          //"this.el" reffers ctlR or L in this function
          this.el.grip = false;

          //Called when trigger is pressed 
          this.el.addEventListener('triggerdown', function (e) {
            if(hasPlayed === false) {
              hasPlayed = true;
              // Start whatever you need to do after first playback has started
              var backgroundsound = document.querySelector('#backgroundsound1');
              backgroundsound.components.sound.playSound();
              loadLevel(0)
            }
              //"this" reffers ctlR or L in this function
              // var point = this.object3D.getWo rldPosition();

              //txt.setAttribute("value",point.x.toFixed(2)+","+point.y.toFixed(2)+","+point.z.toFixed(2));

              //Creating ball entity.
              // var ball = document.createElement('a-sphere');
              // ball.setAttribute('class', 'ball');
              // ball.setAttribute('scale', '0.2 0.2 0.2');
              // ball.setAttribute('position', point);
              // ball.setAttribute('dynamic-body', 'shape: sphere; sphereRadius:0.2; ');
              // ball.setAttribute('sound', 'src: snd/radar.mp3; autoplay: true;');


              //Getting raycaster which was attached to ctrlR or L
              // var dir = this.getAttribute("raycaster").direction;

              // //Setting shoot dierction and speed 
              // var force = new THREE.Vector3(dir.x, dir.y, dir.z);
              // force.multiplyScalar(2000);                   
              // ball.force = this.object3D.localToWorld(force);

              // //Instantiate ball entity in a-scene
              // var scene = document.querySelector('a-scene');
              // scene.appendChild(ball);

              // //shoot "ball" after physics information getting ready. 
              // ball.addEventListener('body-loaded', function (e) {
              //     //"this" reffers ball entity in this function
              //     var p = this.object3D.position;
              //     //this.velocity was calculated before this function is called.
              //     var f = this.force;
              //     this.body.applyForce(
              //         new CANNON.Vec3(f.x, f.y, f.z),
              //         new CANNON.Vec3(p.x, p.y, p.z)
              //     );
              // });
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
              // var els = document.querySelectorAll('.ball');
              //Destroy all ball entities
              // for (var i = 0; i < els.length; i++) {
              //     els[i].parentNode.removeChild(els[i]);
              // }


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


var prevpos = {x: 0, y: 0, z: 0};

AFRAME.registerComponent('update', {
  init: function () {
    // Set up throttling.
    this.throttledFunction = AFRAME.utils.throttle(this.everySecond, 1000, this);
    
  },

  everySecond: function () {
    // Called every second.
    // AFRAME.utils.entity.getComponentProperty(entity, 'geometry');
    // var cam = document.querySelector('#head');  //// use as ref when using wasd
    var cam = document.querySelector('#cameraRig');  //// use as ref when using VR mving
    var pos = AFRAME.utils.entity.getComponentProperty(cam, 'position');
    // document.querySelector('#'+ waypoints[currentwaypoint]);
    var level = world.levels[state.currentlevel]

    // check Position status
    entity = document.querySelector('#'+ level.waypoints[state.currentwaypoint]["name"]);
    var radarpos = AFRAME.utils.entity.getComponentProperty(entity, 'position');
    var x = prevpos.x - pos.x;
    var z = prevpos.z - pos.z;

    var distradar = Math.sqrt(Math.pow((pos.x-radarpos.x), 2) + Math.pow((pos.z-radarpos.z), 2))
    if (distradar < 2){
      if (level.waypoints[state.currentwaypoint]["unlockevent"] ==  "waypointDone"){
        waypointDone();
      } else if (level.waypoints[state.currentwaypoint]["unlockevent"] ==  "levelDone"){
        levelDone();
      } 
    }
    $('#distsensor').html(distradar);

    if (config.handdebug == true){
            var debugstringleft = "level: " +  String(state.currentlevel) 
                            + "\nwaypoint: " + String(state.currentwaypoint
                            + "\nwaypos: " + String(radarpos.x) + ", " + String(radarpos.z) );
            var debugstringright = "pos:"  + String((pos.x).toFixed(2)) + ", " + String((pos.z).toFixed(2))
                                  + "\ndist: " + String(distradar);            
            $('#lefttext').attr('value', debugstringleft);
            $('#righttext').attr('value', debugstringright);
            console.log(debugstringright);
                    }

    prevpos.x = pos.x;
    prevpos.z = pos.z;

  },

  tick: function (t, dt) {
    this.throttledFunction();  // Called once a second.
    // console.log("A frame passed.");  // Called every frame.
   }
});





