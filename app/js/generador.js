function generateDataSet(generator) {
  var numbers = [];
  var counts = {};
  var frecuency = [];
  var dataSet = [];
  var keys = [];

  numbers = generator;

  /*for (var i = 0; i < 100; i++) {
    // numbers[i] = Math.floor((Math.random() * 100));
  }*/

  // Determinamos la frecuencia de cada uno de los numeros
  for (var i = 0; i < numbers.length; i++){
    counts[numbers[i]] = (counts[numbers[i]] + 1) || 1;
  }
  // Extraemos las llaves del objeto counts
  keys = Object.keys(counts).map(Number);
  // Extraemos la frecuencia del objeto counts
  frecuency = $.map(counts, function(value, index) {
    return [value];
  });
  //Generamos el dataSet para ser graficado
  for (var i = 0; i < frecuency.length; i++) {
    dataSet[i] = new Array(keys[i],frecuency[i]);
  }
  return [numbers, dataSet];
}

function ciclicLineal(X0,a,c,m) {
  var numbers = [];
  var i = 1;
  var tempNumber = 0;
  numbers[0] = X0;
  tempNumber =  linealCongruentGenerator(X0, a, c, m);
  while(tempNumber!= X0){
    tempNumber = linealCongruentGenerator(numbers[i-1], a, c, m);
    numbers[i] = tempNumber;
    i++;
  }
  numbers.length = numbers.length - 1;
  for (var i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i]/ m;
  }
  return numbers;
}

function ciclicMinimum(X0,a,m) {
  var numbers = [];
  var first = minimumStandarGenerator(X0,a,m);
  var tempNumber = minimumStandarGenerator(first,a,m);
  numbers[0] = first;
  numbers[1] = tempNumber;
  var i = 2;

  while(tempNumber != first){
    tempNumber = minimumStandarGenerator(numbers[i-1],a,m);
    numbers[i] = tempNumber;
    i++;
  }
  numbers.length = numbers.length - 1;
  return numbers;
}

function linealCongruentGenerator(X0, a, c, m) {
  var Xn = (a * X0 + c) % m;
  return Xn;
}

function minimumStandarGenerator(X0, a, m){
  var Xn = (a * X0) % m;
  return Xn;
}

function minimunStandarFactorizedGenerator(X0, a, m){
  var q = Math.floor(m / a);
  var r = m % a;
  var Xn = (a * (X0 % q) - r * Math.floor(X0 / q));
  if (Xn < 0) Xn = Xn + m;
  return Xn;
}

function calculateFO(numbers){
  var FO = new Array(10).fill(0);

  for (var i = 0; i < numbers.length; i++) {
    number = numbers[i];
    if (number >= 0 && number < 0.1) {
      FO[0] += 1;
    }
    if (number >= 0.1 && number < 0.2) {
      FO[1] += 1;
    }
    if (number >= 0.2 && number < 0.3) {
      FO[2] += 1;
    }
    if (number >= 0.3 && number < 0.4) {
      FO[3] += 1;
    }
    if (number >= 0.4 && number < 0.5) {
      FO[4] += 1;
    }
    if (number >= 0.5 && number < 0.6) {
      FO[5] += 1;
    }
    if (number >= 0.6 && number < 0.7) {
      FO[6] += 1;
    }
    if (number >= 0.7 && number < 0.8) {
      FO[7] += 1;
    }
    if (number >= 0.8 && number < 0.9) {
      FO[8] += 1;
    }
    if (number >= 0.9 && number < 1) {
      FO[9] += 1;
    }
  }
  return FO;
}

function calculateChiTable(numbers){
  var FO = calculateFO(numbers)
  var FE = numbers.length/10;
  var X2 = [];
  var sumX2 = 0;

  for (var i = 0; i < 10; i++) {
    X2[i] = (Math.pow((FE - FO[i]),2) / FE);
  }
  sumX2 = X2.reduce(function(a, b) { return a + b; }, 0);
  return [FO, FE, X2, sumX2];
}

function calculateK_STable(numbers){
  var FO = calculateFO(numbers);
  var FOA = [];
  var POA = [];
  var PEA = new Array(10).fill(0);
  var KS = [];
  var max_KS = 0;

  // calculamos la frecuencia acumulada
  FOA[0] = FO[0];
  for (var i = 1; i < 10; i++) {
    FOA[i] = FOA[i-1] + FO[i];
  }
  var n = FOA[9];
  for (var i = 0; i < 10; i++) {
    POA[i] = FOA[i] / n;
  }
  for (var i = 0; i < 10; i++) {
    PEA[i] += ((i + 1) / 10);
  }
  for (var i = 0; i < 10; i++) {
    KS[i] = Math.abs(PEA[i] - POA[i]);
  }
  max_KS = Math.max.apply(Math, KS);
  console.log(max_KS);
  console.log(KS);
  return [FO,FOA,POA,PEA,KS,max_KS];
}

function showChiTable(numbers){
  $('#chiTable > tbody').empty();
  var chiTable = calculateChiTable(numbers);
  var FO = chiTable[0];
  var FE = chiTable[1];
  var X2 = chiTable[2];
  var sumX2 = chiTable[3];
  var ranges = ["0.0 - 0.1",
                "0.1 - 0.2",
                "0.2 - 0.3",
                "0.3 - 0.4",
                "0.4 - 0.5",
                "0.5 - 0.6",
                "0.6 - 0.7",
                "0.7 - 0.8",
                "0.8 - 0.9",
                "0.9 - 1.0"]
  for (var i = 0; i < 10; i++) {
    $('#chiTable > tbody:last-child').append('<tr> <td>'+ ranges[i] +'</td> <td>'+ FO[i] +'</td> <td>'+ FE +'</td> <td>'+ X2[i] +'</td> </tr>');
  }
  $('#chiTable > tbody:last-child').append('<tr> <td>Total</td><td>-</td><td>-</td><td>'+ sumX2 +'</td> </tr>');
}

function showK_STable(numbers){
  $('#K_STable > tbody').empty();
  var K_STable = calculateK_STable(numbers);
  var FO = K_STable[0]
  var FOA = K_STable[1]
  var POA = K_STable[2]
  var PEA = K_STable[3]
  var KS = K_STable[4]
  var max_KS = K_STable[5]
  var ranges = ["0.0 - 0.1",
                "0.1 - 0.2",
                "0.2 - 0.3",
                "0.3 - 0.4",
                "0.4 - 0.5",
                "0.5 - 0.6",
                "0.6 - 0.7",
                "0.7 - 0.8",
                "0.8 - 0.9",
                "0.9 - 1.0"]
  for (var i = 0; i < 10; i++) {
    $('#K_STable > tbody:last-child').append('<tr> <td>'+ ranges[i] +'</td> <td>'+ FO[i] +'</td> <td>'+ FOA[i] +'</td> <td>'+ POA[i] +'</td> <td>'+ PEA[i] +'</td> <td>'+ KS[i] +'</td> </tr>');
  }
  $('#K_STable > tbody:last-child').append('<tr> <td>Total</td><td>-</td><td>-</td><td>-</td><td>-</td><td>'+ max_KS +'</td> </tr>');
}


$(function () {
    var chartScatter = new Highcharts.Chart({
        title: {
          text: 'Generador lineal congruente'
        },

        chart: {
            renderTo: 'container',
            type: 'scatter'
        },

        series: [{
            name: 'Numeros generados',
            data: [],
            marker: {
              radius: 2
            }
        }]
    });

    var chartBar = new Highcharts.Chart({
        title: {
          text: 'Generador de estandar minimo'
        },

        chart: {
            renderTo: 'container2',
            type: 'scatter'
        },
        
        series: [{
            name: 'Numeros generados',
            data: []
        }]
    });

    // The button action
    $('#change').click(function() {
      var result = generateDataSet(ciclicLineal(5,5,13,7));
      var result2 = generateDataSet(ciclicMinimum(5,12,21));
      // calculateChiTable(result[0]);
      // calculateK_STable(result[0]);
      showChiTable(result[0]);
      showK_STable(result[0]);
      chartScatter.series[0].setData(result[0]);
      //chartBar.series[0].setData(result[1]);
      chartBar.series[0].setData(result2[0]);
    });
});