// // console.log("blah")
$( document ).ready(function() {
    console.log( "ready!" );
    // document.getElementById('cam').setAttribute('position', {x:0, y:2, z:0});

    document.getElementById('cameraRig').object3D.position.set(0, 1, -1)
    document.getElementById('redbox').addEventListener('physicscollided', collisionHandler);

});


// entityEl.emit('physicscollided', {collidingEntity: anotherEntityEl}, false);



function collisionHandler (event) {
  console.log('Entity collided with', event.detail.collidingEntity);
}

AFRAME.registerComponent('collide', {
  schema: {type: 'string'},

  init: function () {
    var stringToLog = this.data;
    console.log(stringToLog);
  }
});





AFRAME.registerComponent('change-color-on-hover', {
    schema: {
      color: {default: 'red'}
    },

    init: function () {
      var data = this.data;
      var el = this.el;  // <a-box>
      var defaultColor = el.getAttribute('material').color;

      el.addEventListener('mouseenter', function () {
        el.setAttribute('color', data.color);
      });

      el.addEventListener('mouseleave', function () {
        el.setAttribute('color', defaultColor);
      });
    }
  });



  AFRAME.registerComponent('emitlog', {
    schema: {
      color: {default: 'red'}
    },

    init: function () {
      var data = this.data;
      var el = this.el;  // <a-box>
      var defaultColor = el.getAttribute('material').color;
      el.addEventListener('collide', function () {
        console.log(el + ', This A-Frame entity collided with another entity!');
      });
    


    //   el.addEventListener('mouseenter', function () {
    //     el.setAttribute('color', data.color);
    //   });

    //   el.addEventListener('mouseleave', function () {
    //     el.setAttribute('color', defaultColor);
    //   });
    }
  });


  AFRAME.registerComponent('thumbstick-logging',{
    init: function () {
      this.el.addEventListener('thumbstickmoved', this.logThumbstick);
    },
    logThumbstick: function (evt) {
      if (evt.detail.y > 0.95) { 
          console.log("DOWN");
        //   document.querySelector('a-box')
        }
      if (evt.detail.y < -0.95) { console.log("UP"); }
      if (evt.detail.x < -0.95) { console.log("LEFT"); }
      if (evt.detail.x > 0.95) { console.log("RIGHT"); }

    }
  });