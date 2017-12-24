//orig:ivangift, mod: rean from milu's excel

var base = {
  'SSS': 3200,
  'SS': 2612.7,
  'S': 2089.35,
  'A': 1690.65,
  'B': 1309.8,
  'C': 817.5,
  'F': 15,
}

var hairSize = 0.5;
var hairScoring = {
  'SSS': 1612.5,
  'SS': 1336.5,
  'S': 1057.5,
  'A': 849,
  'B': 654,
  'C': 517.5,
  'F': base['F'] * hairSize
}

var dressSize = 2;
var dressScoring = {
  'SSS': 6450,
  'SS': 5241,
  'S': 4203,
  'A': 3388.5,
  'B': 2647.5,
  'C': 2052,
  'F': base['F'] * dressSize
};

var coatSize = 0.2;
var coatScoring = {
  'SSS': 645,
  'SS': 522,
  'S': 414,
  'A': 337.5,
  'B': 258,
  'C': 207,
  'F': base['F'] * coatSize
};

var topSize = 1;
var topScoring = {
  'SSS': 3225,
  'SS': 2598,
  'S': 2082,
  'A': 1690.5,
  'B': 1342.5,
  'C': 1041,
  'F': base['F'] * topSize
};

var bottomSize = 1;
var bottomScoring = {
  'SSS': 3225,
  'SS': 2593.5,
  'S': 2085,
  'A': 1696.5,
  'B': 1324.5,
  'C': 1029,
  'F': base['F'] * bottomSize
};

var sockSize = 0.3;
var sockScoring = {
  'SSS': 967.5,
  'SS': 783,
  'S': 627,
  'A': 513,
  'B': 390,
  'C': 309,
  'F': base['F'] * sockSize
};

var shoeSize = 0.4;
var shoeScoring = {
  'SSS': 1290,
  'SS': 1039.5,
  'S': 832.5,
  'A': 676.5,
  'B': 516,
  'C': 409.5,
  'F': base['F'] * shoeSize
};

var accessoriesSize = 0.2;
var accessoriesScoring = {
  'SSS': 645,
  'SS': 516,
  'S': 415.5,
  'A': 334.5,
  'B': 258,
  'C': 202.5,
  'F': base['F'] * accessoriesSize
};

var makeupSize = 0.1;
var makeupScoring = {
  'SSS': 322.5,
  'SS': 265.5,
  'S': 214.5,
  'A': 163.5,
  'B': 124.5,
  'C': 75,
  'F': base['F'] * makeupSize
};

var lightSize = 0.2;
var lightScoring = {
  'SSS': 645,
  'SS': 516,
  'S': 415.5,
  'A': 334.5,
  'B': 258,
  'C': 202.5,
  'F': base['F'] * lightSize
};


function avg(score) {
  ret = {};
  for (s in score) {
    ret[s] = (score[s][0] + score[s][1]) / 2;
  }
  return ret;
}

function sigma(score) {
  ret = {};
  for (s in score) {
    ret[s] = (score[s][0] - score[s][1]) / 2;
  }
  return ret;
}

var scoring = {
  '髮型': hairScoring,
  '連身裙': dressScoring,
  '外套': coatScoring,
  '上衣': topScoring,
  '下著': bottomScoring,
  '襪子': sockScoring,
  '鞋子': shoeScoring,
  '飾品': accessoriesScoring,
  '妝容': makeupScoring,
  '螢光之靈': lightScoring
}

var scoringSize = {
  '髮型': hairSize,
  '連身裙': dressSize,
  '外套': coatSize,
  '上衣': topSize,
  '下著': bottomSize,
  '襪子': sockSize,
  '鞋子': shoeSize,
  '飾品': accessoriesSize,
  '妝容': makeupSize,
  '螢光之靈': lightSize
}

var deviation = {
  '髮型': sigma(hairScoring),
  '連身裙': sigma(dressScoring),
  '外套': sigma(coatScoring),
  '上衣': sigma(topScoring),
  '下著': sigma(bottomScoring),
  '襪子': sigma(sockScoring),
  '鞋子': sigma(shoeScoring),
  '飾品': sigma(accessoriesScoring),
  '妝容': sigma(makeupScoring),
  '螢光之靈': sigma(lightScoring)
}

function getScore(clothesType) {
  if (scoring[clothesType]) {
    return scoring[clothesType];
  }
  if (scoring[clothesType.split('-')[0]]) {
    return scoring[clothesType.split('-')[0]];
  }
  return {};
}

function getDeviation(clothesType) {
  if (deviation[clothesType]) {
    return deviation[clothesType];
  }
  if (deviation[clothesType.split('-')[0]]) {
    return deviation[clothesType.split('-')[0]];
  }
  return {};
}

var typeInfo = function() {
  var ret = {};
  for (var i in category) {
    var name = category[i];
    ret[name] = {
      type: name,
      mainType: name.split('-')[0],
      score: getScore(name),
      deviation: getDeviation(name),
      needFilter: function() {
        return this.mainType == "連身裙"
            || this.mainType == "外套"
            || this.mainType == "上衣"
            || this.mainType == "下著";
      }
    }
  }
  return ret;
}();
