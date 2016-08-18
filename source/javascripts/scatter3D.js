var ScatterPlot = function(renderer, camera, data) {
  var data = data;

  function createTextCanvas(text, color, font, size) {
    var size = size || 16;
    var canvas = document.createElement('canvas');
    var att = document.createAttribute("id");
    att.value = "canvas-id";
    canvas.setAttributeNode(att);
    var ctx = canvas.getContext('2d');
    var fontStr = (size + 'px ') + (font || 'Arial');
    ctx.font = fontStr;
    var w = ctx.measureText(text).width;
    var h = Math.ceil(size);
    canvas.width = w;
    canvas.height = h;
    ctx.font = fontStr;
    ctx.fillStyle = color || 'black';
    ctx.fillText(text, 0, Math.ceil(size * 0.8));
    return canvas;
  }

  function createText2D(text, color, font, size, segW, segH) {
    var canvas = createTextCanvas(text, color, font, size);
    var plane = new THREE.PlaneGeometry(canvas.width, canvas.height, segW, segH);
    var tex = new THREE.Texture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    var planeMat = new THREE.MeshBasicMaterial({
        map: tex,
        color: 0xffffff,
        transparent: true
    });
    var mesh = new THREE.Mesh(plane, planeMat);
    mesh.scale.set(0.5, 0.5, 0.5);
    mesh.doubleSided = true;
    return mesh;
  }

  // from http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  function hexToRgb(hex) { //TODO rewrite with vector output
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  var w = 500;
  var h = 400;
  renderer.setSize(w, h);
  var my_container = document.getElementById('container3d');
  if (!document.getElementById('canvas')) {
    my_container.appendChild(renderer.domElement);
  }

  renderer.setClearColor(0xFFFFFF, 1.0);

  // var camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000);
  camera.position.z = 200;
  camera.position.x = 100;
  camera.position.y = 100;

  var scene = new THREE.Scene();

  var scatterPlot = new THREE.Object3D();
  scene.add(scatterPlot);

  scatterPlot.rotation.y = 0;

  function v(x, y, z) {
      return new THREE.Vector3(x, y, z);
  }

  var unfiltered = [];

  var format = d3.format("+.3f");

  // ******************************

  // var data = [[30,200,14], [19,12,1], [146, 27, 180], [14, 216, 18], [112, 90, 117]];

  var vpts = {
      xMax: 255,
      xMin: 0,
      yMax: 255,
      yMin: 0,
      zMax: 255,
      zMin: 0
  };

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  var xScale = d3.scaleLinear()
                 .domain([0,255])
                 .range([-50,50]);
  var yScale = d3.scaleLinear()
                 .domain([0,255])
                 .range([-50,50]);                  
  var zScale = d3.scaleLinear()
                 .domain([0,255])
                 .range([-50,50]);

  var lineGeo = new THREE.Geometry();
  lineGeo.vertices.push(
      v(xScale(vpts.xMin), yScale(vpts.yMin), zScale(vpts.zMin)), v(xScale(vpts.xMax), yScale(vpts.yMin), zScale(vpts.zMin)),
      v(xScale(vpts.xMax), yScale(vpts.yMax), zScale(vpts.zMin)), v(xScale(vpts.xMin), yScale(vpts.yMax), zScale(vpts.zMin)),
      v(xScale(vpts.xMin), yScale(vpts.yMax), zScale(vpts.zMax)), v(xScale(vpts.xMin), yScale(vpts.yMin), zScale(vpts.zMax)),

      v(xScale(vpts.xMin), yScale(vpts.yMin), zScale(vpts.zMin)), v(xScale(vpts.xMin), yScale(vpts.yMax), zScale(vpts.zMin)),
      v(xScale(vpts.xMin), yScale(vpts.yMin), zScale(vpts.zMin)), v(xScale(vpts.xMin), yScale(vpts.yMin), zScale(vpts.zMax)),
      v(xScale(vpts.xMax), yScale(vpts.yMin), zScale(vpts.zMax)), v(xScale(vpts.xMax), yScale(vpts.yMin), zScale(vpts.zMax)),
      v(xScale(vpts.xMax), yScale(vpts.yMin), zScale(vpts.zMin))
  );

  var lineMat = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 2
  });

  var line = new THREE.Line(lineGeo, lineMat);
  line.type = THREE.Lines;
  scatterPlot.add(line);

  var valueX = createText2D(0);
  valueX.position.x = xScale(vpts.xMin) - 12,
  valueX.position.y = yScale(vpts.yMin),
  valueX.position.z = zScale(vpts.zMin);
  scatterPlot.add(valueX);

  var titleX = createText2D('R');
  titleX.position.x = xScale(vpts.xMax) + 12;
  titleX.position.y = yScale(vpts.yMin) + 10,
  titleX.position.z = zScale(vpts.zMin);
  scatterPlot.add(titleX);

  var valueX = createText2D(255);
  valueX.position.x = xScale(vpts.xMax) + 12;
  valueX.position.y = yScale(vpts.yMin),
  valueX.position.z = zScale(vpts.zMin);
  scatterPlot.add(valueX);

  var titleY = createText2D('G');
  titleY.position.x = xScale(vpts.xMin),
  titleY.position.y = yScale(vpts.yMax) + 15,
  titleY.position.z = zScale(vpts.zMin);
  scatterPlot.add(titleY);

  var valueY = createText2D(255);
  valueY.position.x = xScale(vpts.xMin),
  valueY.position.y = yScale(vpts.yMax) + 5,
  valueY.position.z = zScale(vpts.zMin);
  scatterPlot.add(valueY);

  var titleZ = createText2D('B');
  titleZ.position.x = xScale(vpts.xMin),
  titleZ.position.y = yScale(vpts.yMin) + 10,
  titleZ.position.z = zScale(vpts.zMax) + 7;
  scatterPlot.add(titleZ);

  var valueZ = createText2D(255);
  valueZ.position.x = xScale(vpts.xMin),
  valueZ.position.y = yScale(vpts.yMin),
  valueZ.position.z = zScale(vpts.zMax) + 7;
  scatterPlot.add(valueZ);

  // var data = [[30,200,14], [19,12,1], [146, 27, 180], [14, 216, 18], [112, 90, 117]];


  var mat = new THREE.PointsMaterial({
      vertexColors: true,
      size: 4
  });

  var pointCount = data.length;
  var pointGeo = new THREE.Geometry();

  for (var i = 0; i < pointCount; i ++) {
      var x = xScale(data[i][0]);
      var y = yScale(data[i][1]);
      var z = zScale(data[i][2]);

      pointGeo.vertices.push(new THREE.Vector3(x, y, z));
      pointGeo.colors.push(new THREE.Color().setRGB(100,0,100));

  }

  var points = new THREE.Points(pointGeo, mat);
  scatterPlot.add(points);

  renderer.render(scene, camera);
  var paused = false;
  var last = new Date().getTime();
  var down = false;
  var sx = 0,
      sy = 0;
      
  window.onmousedown = function(ev) {
      down = true;
      sx = ev.clientX;
      sy = ev.clientY;
  };

  window.onmouseup = function() {
      down = false;
  };

  window.onmousemove = function(ev) {
      if (down) {
          var dx = ev.clientX - sx;
          var dy = ev.clientY - sy;
          scatterPlot.rotation.y += dx * 0.01;
          camera.position.y += dy;
          sx += dx;
          sy += dy;
      }
  };

  var animating = false;
  window.ondblclick = function() {
      animating = !animating;
  };

  function animate(t) {
      if (!paused) {
          last = t;
          if (animating) {
              var v = pointGeo.vertices;
              for (var i = 0; i < v.length; i++) {
                  var u = v[i];
                  u.angle += u.speed * 0.01;
                  u.x = Math.cos(u.angle) * u.radius;
                  u.z = Math.sin(u.angle) * u.radius;
              }
              pointGeo.__dirtyVertices = true;
          }
          renderer.clear();
          camera.lookAt(scene.position);
          renderer.render(scene, camera);
      }
      window.requestAnimationFrame(animate, renderer.domElement);
  };

  animate(new Date().getTime());
  onmessage = function(ev) {
      paused = (ev.data == 'pause');
  };
}

module.exports = ScatterPlot;
