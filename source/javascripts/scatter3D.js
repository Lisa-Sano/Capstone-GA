var ScatterPlot = function() {
  this.xScale = d3.scaleLinear()
                 .domain([0,255])
                 .range([-50,50]);
  this.yScale = d3.scaleLinear()
                 .domain([0,255])
                 .range([-50,50]);                  
  this.zScale = d3.scaleLinear()
                 .domain([0,255])
                 .range([-50,50]);
  this.scatterPlot = new THREE.Object3D();
  this.renderer = new THREE.WebGLRenderer({ antialias: true });
  this.camera = new THREE.PerspectiveCamera(45, 500 / 400, 1, 10000);
  this.scene = new THREE.Scene();
}

ScatterPlot.prototype.initPlot = function() {
  function createTextCanvas(text, color, font, size) {
    var size = size || 16;
    var canvas = document.createElement('canvas');
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

  var w = 500;
  var h = 400;
  this.renderer.setSize(w, h);
  var my_container = document.getElementById('container3d');
  my_container.appendChild(this.renderer.domElement);

  this.renderer.setClearColor(0xFFFFFF, 1.0);

  this.camera.position.z = 200;
  this.camera.position.x = 100;
  this.camera.position.y = 100;

  this.scene.add(this.scatterPlot);

  this.scatterPlot.rotation.y = 0;

  function v(x, y, z) {
    return new THREE.Vector3(x, y, z);
  }

  var vpts = {
      xMax: 255,
      xMin: 0,
      yMax: 255,
      yMin: 0,
      zMax: 255,
      zMin: 0
  };

  var lineGeo = new THREE.Geometry();
  lineGeo.vertices.push(
    v(this.xScale(vpts.xMin), this.yScale(vpts.yMin), this.zScale(vpts.zMin)), v(this.xScale(vpts.xMax), this.yScale(vpts.yMin), this.zScale(vpts.zMin)),
    v(this.xScale(vpts.xMax), this.yScale(vpts.yMax), this.zScale(vpts.zMin)), v(this.xScale(vpts.xMin), this.yScale(vpts.yMax), this.zScale(vpts.zMin)),
    v(this.xScale(vpts.xMin), this.yScale(vpts.yMax), this.zScale(vpts.zMax)), v(this.xScale(vpts.xMin), this.yScale(vpts.yMin), this.zScale(vpts.zMax)),

    v(this.xScale(vpts.xMin), this.yScale(vpts.yMin), this.zScale(vpts.zMin)), v(this.xScale(vpts.xMin), this.yScale(vpts.yMax), this.zScale(vpts.zMin)),
    v(this.xScale(vpts.xMin), this.yScale(vpts.yMin), this.zScale(vpts.zMin)), v(this.xScale(vpts.xMin), this.yScale(vpts.yMin), this.zScale(vpts.zMax)),
    v(this.xScale(vpts.xMax), this.yScale(vpts.yMin), this.zScale(vpts.zMax)), v(this.xScale(vpts.xMax), this.yScale(vpts.yMin), this.zScale(vpts.zMax)),
    v(this.xScale(vpts.xMax), this.yScale(vpts.yMin), this.zScale(vpts.zMin))
  );

  var lineMat = new THREE.LineBasicMaterial({
    color: 0x000000,
    linewidth: 2
  });

  var line = new THREE.Line(lineGeo, lineMat);
  line.type = THREE.Lines;
  this.scatterPlot.add(line);

  var valueX = createText2D(0);
  valueX.position.x = this.xScale(vpts.xMin) - 12,
  valueX.position.y = this.yScale(vpts.yMin),
  valueX.position.z = this.zScale(vpts.zMin);
  this.scatterPlot.add(valueX);

  var titleX = createText2D('R');
  titleX.position.x = this.xScale(vpts.xMax) + 12;
  titleX.position.y = this.yScale(vpts.yMin) + 10,
  titleX.position.z = this.zScale(vpts.zMin);
  this.scatterPlot.add(titleX);

  var valueX = createText2D(255);
  valueX.position.x = this.xScale(vpts.xMax) + 12;
  valueX.position.y = this.yScale(vpts.yMin),
  valueX.position.z = this.zScale(vpts.zMin);
  this.scatterPlot.add(valueX);

  var titleY = createText2D('G');
  titleY.position.x = this.xScale(vpts.xMin),
  titleY.position.y = this.yScale(vpts.yMax) + 15,
  titleY.position.z = this.zScale(vpts.zMin);
  this.scatterPlot.add(titleY);

  var valueY = createText2D(255);
  valueY.position.x = this.xScale(vpts.xMin),
  valueY.position.y = this.yScale(vpts.yMax) + 5,
  valueY.position.z = this.zScale(vpts.zMin);
  this.scatterPlot.add(valueY);

  var titleZ = createText2D('B');
  titleZ.position.x = this.xScale(vpts.xMin),
  titleZ.position.y = this.yScale(vpts.yMin) + 10,
  titleZ.position.z = this.zScale(vpts.zMax) + 7;
  this.scatterPlot.add(titleZ);

  var valueZ = createText2D(255);
  valueZ.position.x = this.xScale(vpts.xMin),
  valueZ.position.y = this.yScale(vpts.yMin),
  valueZ.position.z = this.zScale(vpts.zMax) + 7;
  this.scatterPlot.add(valueZ);

  function animate(renderer, camera, scene) {
    renderer.clear();
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    window.requestAnimationFrame(function () {
      animate(renderer, camera, scene);
    });
  };

  animate(this.renderer, this.camera, this.scene);

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
      that.scatterPlot.rotation.y += dx * 0.01;
      that.camera.position.y += dy;
      sx += dx;
      sy += dy;
    }
  };
}

ScatterPlot.prototype.clearPlot = function () {
  if (this.points) {
    this.scatterPlot.remove(this.points);
  }
};

ScatterPlot.prototype.drawPlot = function(data) {
  this.clearPlot();

  var that = this;

  var mat = new THREE.PointsMaterial({
    vertexColors: true,
    size: 4
  });

  var pointCount = data.length;
  
  var pointGeo = new THREE.Geometry();

  for (var i = 0; i < pointCount; i ++) {
    var x = this.xScale(data[i][0]);
    var y = this.yScale(data[i][1]);
    var z = this.zScale(data[i][2]);

    pointGeo.vertices.push(new THREE.Vector3(x, y, z));
    pointGeo.colors.push(new THREE.Color("rgb(" + data[i][0] + "," + data[i][1] + "," + data[i][2] + ")"));
  }

  var points = new THREE.Points(pointGeo, mat);
  this.points = points;
  this.scatterPlot.add(points);
}

module.exports = ScatterPlot;
