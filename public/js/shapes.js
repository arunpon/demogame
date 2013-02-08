var GAME_UTIL = (function() {
      var SHAPES = 'oval rectangle roundedRectangle'.split(' ');
      var SHAPE_COUNT = '1 2 3'.split(' ');
      var SHAPE_COLOR = '#FB000D #4D54D8 #14D100'.split(' ');
      var SHAPE_FILLTYPE = 'solid empty dotted'.split(' ');
     return {
        getShape: function(i) { return SHAPES[i]; },
        getShapeCount: function(i) { return SHAPE_COUNT[i]; },
        getShapeColor: function(i) { return SHAPE_COLOR[i]; },
        getShapeFillType: function(i) { return SHAPE_FILLTYPE[i]; },
        getXpos: function(xPos, count) {
          if (count == 1) {
            return xPos/2;
          } else if (count == 2) {
            return xPos/3;
          } else {
            return xPos/6;
          }
        },
        getFillType: function(fillType) {
          if (fillType.indexOf('solid') != -1) {
            return 'fillStyle';
          } else if (fillType.indexOf('empty') != -1) {
            return 'strokeStyle';
          } else {
            //return getPattern(canvasElement, color);
            return 'fillStyle';
          }
        },
        getColorOrPattern: function(canvasElement, fillType, color) {
          if (fillType.indexOf('solid') != -1) {
            return color;
          } else if (fillType.indexOf('empty') != -1) {
            return color;
          } else {
            //return getPattern(canvasElement, color);
            return this.getPattern(canvasElement, color);
          }

        },
        getPattern:function(canvasElement, color){ 
          return canvasElement.createPattern({
          // Define width/height of pattern (before repeating)
              width: 5, height: 5,
              source: function(context) {
                // Draw rectangle (which will repeat)
                $(this).drawRect({
                  fillStyle: "transparent",
                  strokeStyle: color,
                  strokeWidth: 1,
                  x: 0, y: 0,
                  width: 5, height: 5,
                  fromCenter: false,
                });
              }
          });
        }
    };
})();

//TODO: Probably needs to be replaced by BackBone - Could be a good learning experience
var GAME_MODEL = (function() {
  var gameArrayAttributes = [];
  var setArrayAttributes = [];
  var setArrayIndexes = []; //Could be used for Hint functionality
  var selectedTiles = new Object();
  return{
    tileAttributes: function() {return gameArrayAttributes},
    populatedSet : function() {return setArrayAttributes},
    populatedSetIndexes : function() {return  setArrayIndexes},
    tilesSelected: function() {return selectedTiles},
    emptySelectedTiles : function() {selectedTiles = new Object()}
  };
  })();