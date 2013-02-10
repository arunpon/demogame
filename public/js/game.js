$(document).ready(function() {

  var $containers = $(".container");

  function renderChildren() {
    $containers.each(function(container_i) {
      //$(container_i).width($('body').width()/3);
      //$(container_i).height($('body').height()/3);
      $( "#dialog-confirm" ).hide();
      $(".label").html("Please Solve the puzzle, Click three tiles that form a set");
      var randomArray = getDistinctRandomNumber(3, 0, 11);
      randomArray = getValueObjFromArray(randomArray);
      var gameArray = [];
      var setSize = 3;

        var shapeDistinct = getDistinct();
        var colorDistinct = getDistinct();
        var fillTypeDistinct = getDistinct();
        var countDistinct = getDistinct();
        var j = shapeDistinct.length -1;
      for(var i=0;i<12;i++) {
        var column = i%4;
        var row = Math.floor (i/3);
        var element = $("<canvas width = '120' height = '80' class='object' style='position:absolute;'"+ "id='tile_"+ i +"' ></canvas>");
        $(this).append(element);
        if (!randomArray[i]) {
          var shapeRand = getRandom(0,2), colorRand = getRandom(0,2), fillRand = getRandom(0,2), countRand = getRandom(0,2);
          drawShape(element, GAME_UTIL.getShape(shapeRand), GAME_UTIL.getShapeColor(colorRand), GAME_UTIL.getShapeFillType(fillRand), countRand);
          GAME_MODEL.tileAttributes().push([shapeRand, colorRand, fillRand, countRand]);
        } else {
          //Add the set
          if (j >= 0) {
            drawShape(element, GAME_UTIL.getShape(shapeDistinct[j]), GAME_UTIL.getShapeColor(colorDistinct[j]), GAME_UTIL.getShapeFillType(fillTypeDistinct[j]), countDistinct[j]);
            GAME_MODEL.tileAttributes().push([shapeDistinct[j], colorDistinct[j], fillTypeDistinct[j], countDistinct[j]]);
            GAME_MODEL.populatedSet().push([shapeDistinct[j], colorDistinct[j], fillTypeDistinct[j], countDistinct[j]]);
            GAME_MODEL.populatedSetIndexes().push(i);
            j--;
          }
        }
      }
      console.log(isSet(GAME_MODEL.populatedSet()));
      console.log(GAME_MODEL.populatedSetIndexes());
    });
  }
  renderChildren();

  

  function drawShape(element, shapeType, color, fillStyle, shapeNum) {
    if (shapeType.indexOf('oval') != -1) {
        drawEllipse(element, color, fillStyle, shapeNum);
    } else if (shapeType.indexOf('rectangle') != -1) {
        drawRectangle(element, color, fillStyle, shapeNum);
    } else {
        drawTriangle(element, color, fillStyle, shapeNum);
    }
  }

  function drawRectangle(element, color, fillStyle, shapeNum) {
      var width = $(element).width();
      var yPos = $(element).height();


      var xPos = GAME_UTIL.getXpos(width, shapeNum+1);
      for (var i=1; i <= shapeNum+1; i++) {
        var rectObj = {
          x: xPos, y: yPos/2,
          width: (width/3 - 10),
          height: yPos - 10,
          strokeWidth: 4
        };
        rectObj[GAME_UTIL.getFillType(fillStyle)] = GAME_UTIL.getColorOrPattern(element, fillStyle, color);
        element.drawRect(rectObj);
        xPos = xPos + (width/3);
    }
  }

  function drawEllipse(element, color, fillStyle, shapeNum) {
      var width = $(element).width();
      var yPos = $(element).height();

      var xPos = GAME_UTIL.getXpos(width, shapeNum+1);
      for (var i=1; i <= shapeNum+1; i++) {
          var ellObj = {
            x: xPos, y: yPos/2,
            width: (width/3 - 15),
            height: yPos - 10,
            strokeWidth: 4
          };
        ellObj[GAME_UTIL.getFillType(fillStyle)] = GAME_UTIL.getColorOrPattern(element, fillStyle, color);
        element.drawEllipse(ellObj);
        xPos = xPos + (width/3); 
    }
  }

  function drawTriangle(element, color, fillStyle, shapeNum) {
      var canvasWidth = $(element).width();
      var canvasHeight = $(element).height();

      var shapeWidth = (canvasWidth/3) - 10;
      var shapeHeight = canvasHeight - 10;

      var yPos = $(element).height()/2;
      var xPos = GAME_UTIL.getXpos(canvasWidth, shapeNum+1);
      var xposInc =  (xPos -(shapeWidth/2));
      for (var i=1; i <= shapeNum+1; i++) {
        var lineObj = {
          strokeWidth: 4,
          x1: (xPos -(shapeWidth/2)), y1: yPos,
          x2: xPos, y2: (yPos - (shapeHeight/2)),
          x3: (xPos + (shapeWidth/2)), y3: yPos,
          x4: xPos, y2: (yPos + (shapeHeight/2)),
        };

        var lineObj1 = {
          strokeWidth: 4,
          x1: (xPos -(shapeWidth/2)), y1: yPos,
          x2: xPos, y2: (yPos + (shapeHeight/2)),
          x3: (xPos + (shapeWidth/2)), y3: yPos,
          x4: xPos, y2: (yPos - (shapeHeight/2)),
        };

        lineObj[GAME_UTIL.getFillType(fillStyle)] = GAME_UTIL.getColorOrPattern(element, fillStyle, color);
        lineObj1[GAME_UTIL.getFillType(fillStyle)] = GAME_UTIL.getColorOrPattern(element, fillStyle, color);
        element.drawLine(lineObj);
        element.drawLine(lineObj1);
        xPos = xPos + (canvasWidth/3); 
    }
  }

function drawRoundedRectangle(element, color, fillStyle, shapeNum) {
      var width = $(element).width();
      var yPos = $(element).height();

      var xPos = GAME_UTIL.getXpos(width, shapeNum+1);
      for (var i=1; i <= shapeNum+1; i++) {
        var rrObj = {
          x: xPos, y: yPos/2,
          width: (width/3 - 10),
          height: yPos - 10,
          cornerRadius: 15,
          strokeWidth: 4
        };
        rrObj[GAME_UTIL.getFillType(fillStyle)] = GAME_UTIL.getColorOrPattern(element, fillStyle, color);
        element.drawRect(rrObj);
        xPos = xPos + (width/3); 
    }
  }  

function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDistinctRandomNumber(size, min, max) {
  var randomArray = [];
  var randObject = new Object();
  while (getObjectSize(randObject) < size) {
      var randNum = getRandom(min,max);
      if (!randObject.hasOwnProperty(randNum)) {
        randObject[randNum] = true;
        randomArray.push(randNum);
      }
  }
  return randomArray;
}


function getDistinct() {
  var i = getRandom(0,1);
  var j = getRandom(0,2);
  if (i == 1) {
    return [j, j, j];
  } else {
    return getDistinctRandomNumber(3, 0, 2);
  }
}

function getObjectSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

function getValueObjFromArray(arrayObj) {
  var myObj= new Object();
  $(arrayObj).each(function (index, value) {
    myObj[value] = true;
  });
  return myObj;
}

function isSet(setArray) {
  var length = -10;
  $(setArray).each(function (index, value) {
    if (length < 0) {
      length = value.length;
    }

    if (length != value.length) {
      return false;
    }
  });
  //var i = setArray.length;
  //var j = length;

  for (var j=0; j < length; j++) {
    var attributeValues = [];
    for (var i=0; i < setArray.length; i++) {
      attributeValues.push(setArray[i][j]);
    }
    if (!isDistinctOrSame(attributeValues)) {
      return false;
    }
  }

  return true;
}

function isDistinctOrSame(attributeValuesArray) {
  //Get unique values from attributeValuesArray
  var arr = $.grep(attributeValuesArray, function(v, k){
    return $.inArray(v ,attributeValuesArray) === k;
  });

  if (arr.length == attributeValuesArray.length ||  arr.length == 1) {
    return true;
  } else {
    return false;
  }
}

  // Initial Shapeshift
function shapeShift() {
  $containers.shapeshift({
    paddingY: 20,
    paddingX: 20,
    enableDrag: true,
    columns: 4,
    enableAnimationOnInit: true
  });
  /*var width = $('body').width()/2;
  var height = $('body').height()/3;
  $containers.gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [120, 80],
        min_cols: 4,
        max_size_x: 4,
        autogenerate_stylesheet: true
    });*/
}

shapeShift();

  $containers.on("click", function(e, selected) {
    //if () {
      var elemId = e.target.id;
      if (!elemId) {
        return;
      }
      if (GAME_MODEL.tilesSelected()[elemId]) {
        //Unclick Remove Highlight
        $('#' + elemId).removeClass('borderStyle');
        delete GAME_MODEL.tilesSelected()[elemId];
      } else {
        //Add highlight
        GAME_MODEL.tilesSelected()[elemId] = true;
        if (_.size(GAME_MODEL.tilesSelected()) <= 3) {
          $('#' + elemId).addClass('borderStyle');
          if (_.size(GAME_MODEL.tilesSelected()) == 3) {
            var testSet = [];
            $.each(GAME_MODEL.tilesSelected(), function(key, value) {
              var idx = key.substring(key.indexOf('_') + 1);
              testSet.push(GAME_MODEL.tileAttributes()[idx]);
            });
            if (isSet(testSet)) {
              /*$.each(GAME_MODEL.tilesSelected(), function(key, value) {
                $('#' + key).removeClass('borderStyle');
              });
              GAME_MODEL.emptySelectedTiles();*/
              $(".label").html("Cool");
              //alert('Cool.. Click OK for a new puzzle');
              $( "#dialog-confirm" ).dialog({
                resizable: false,
                height:160,
                modal: true,
              buttons: {
                "OK": function() {
                  location.reload();
                }
              }
            });
              $( "#dialog-confirm" ).show();
            } else {
              $(".label").html("Please keep trying again");
            }
          }
        } else {
          //Dont do anything
          delete GAME_MODEL.tilesSelected()[elemId];
        }
      }
    //}
  });

  // ----------------------------------------------------------------------
  // - Drag and Drop events for shapeshift
  // ----------------------------------------------------------------------

  $containers.on("ss-event-dropped", function(e, selected) {
    var $selected = $(selected)
    // console.log("The dropped item is:", $selected)

    // Get the index position of each object
    $objects = $(this).children();
    $objects.each(function(i) {
      // console.log("Get the index position:", i)
      // console.log("Get the current element:", $(this))
    });
  });

  $containers.on("ss-event-dragged", function(e, selected) {
    var $selected = $(selected);
    // console.log("This is the item being dragged:", $selected);
  });
});