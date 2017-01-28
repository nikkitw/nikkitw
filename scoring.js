// Ivan's Workshop
// in pairs of lower bound, upper bound
var base = {
  'SSS': 3200,
  'SS': 2612.7,
  'S': 2089.35,
  'A': 1690.65,
  'B': 1309.8,
  'C': 817.5
}

var hairSize = 0.5;
var hairScoring = {
  'SSS': base['SSS'] * hairSize,
  'SS': base['SS'] * hairSize,
  'S': base['S'] * hairSize,
  'A': base['A'] * hairSize,
  'B': base['B'] * hairSize,
  'C': base['C'] * hairSize
}

var dressSize = 2;
var dressScoring = {
  'SSS': base['SSS'] * dressSize,
  'SS': base['SS'] * dressSize,
  'S': base['S'] * dressSize,
  'A': base['A'] * dressSize,
  'B': base['B'] * dressSize,
  'C': base['C'] * dressSize
};

var coatSize = 0.2;
var coatScoring = {
  'SSS': base['SSS'] * coatSize,
  'SS': base['SS'] * coatSize,
  'S': base['S'] * coatSize,
  'A': base['A'] * coatSize,
  'B': base['B'] * coatSize,
  'C': base['C'] * coatSize
};

var topSize = 1;
var topScoring = {
  'SSS': base['SSS'] * topSize,
  'SS': base['SS'] * topSize,
  'S': base['S'] * topSize,
  'A': base['A'] * topSize,
  'B': base['B'] * topSize,
  'C': base['C'] * topSize
};

var bottomSize = 1;
var bottomScoring = {
  'SSS': base['SSS'] * bottomSize,
  'SS': base['SS'] * bottomSize,
  'S': base['S'] * bottomSize,
  'A': base['A'] * bottomSize,
  'B': base['B'] * bottomSize,
  'C': base['C'] * bottomSize
};

var sockSize = 0.3;
var sockScoring = {
  'SSS': base['SSS'] * sockSize,
  'SS': base['SS'] * sockSize,
  'S': base['S'] * sockSize,
  'A': base['A'] * sockSize,
  'B': base['B'] * sockSize,
  'C': base['C'] * sockSize
};

var shoeSize = 0.4;
var shoeScoring = {
  'SSS': base['SSS'] * shoeSize,
  'SS': base['SS'] * shoeSize,
  'S': base['S'] * shoeSize,
  'A': base['A'] * shoeSize,
  'B': base['B'] * shoeSize,
  'C': base['C'] * shoeSize
};

var accessoriesSize = 0.2;
var accessoriesScoring = {
  'SSS': base['SSS'] * accessoriesSize,
  'SS': base['SS'] * accessoriesSize,
  'S': base['S'] * accessoriesSize,
  'A': base['A'] * accessoriesSize,
  'B': base['B'] * accessoriesSize,
  'C': base['C'] * accessoriesSize
};

var makeupSize = 0.1;
var makeupScoring = {
  'SSS': base['SSS'] * makeupSize,
  'SS': base['SS'] * makeupSize,
  'S': base['S'] * makeupSize,
  'A': base['A'] * makeupSize,
  'B': base['B'] * makeupSize,
  'C': base['C'] * makeupSize
};

var lightSize = 0.2;
var lightScoring = {
  'SSS': base['SSS'] * lightSize,
  'SS': base['SS'] * lightSize,
  'S': base['S'] * lightSize,
  'A': base['A'] * lightSize,
  'B': base['B'] * lightSize,
  'C': base['C'] * lightSize
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
  '連衣裙': dressScoring,
  '外套': coatScoring,
  '上衣': topScoring,
  '下裝': bottomScoring,
  '襪子': sockScoring,
  '鞋子': shoeScoring,
  '飾品': accessoriesScoring,
  '妝容': makeupScoring,
  '螢光之靈': lightScoring
}

var scoringSize = {
  '髮型': hairSize,
  '連衣裙': dressSize,
  '外套': coatSize,
  '上衣': topSize,
  '下裝': bottomSize,
  '襪子': sockSize,
  '鞋子': shoeSize,
  '飾品': accessoriesSize,
  '妝容': makeupSize,
  '螢光之靈': lightSize
}

var deviation = {
  '髮型': sigma(hairScoring),
  '連衣裙': sigma(dressScoring),
  '外套': sigma(coatScoring),
  '上衣': sigma(topScoring),
  '下裝': sigma(bottomScoring),
  '襪子': sigma(sockScoring),
  '鞋子': sigma(shoeScoring),
  '飾品': sigma(accessoriesScoring),
  '妝容': sigma(makeupScoring),
  '螢光之靈': sigma(lightScoring),
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
        return this.mainType == "連衣裙"
            || this.mainType == "外套"
            || this.mainType == "上衣"
            || this.mainType == "下裝";
      }
    }
  }
  return ret;
}();
