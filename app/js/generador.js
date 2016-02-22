var numbers = [];

function generarTabla(X0, a, c, m) {
  var counts = {};
  numbers[0] = X0;
  for (var i = 0; i < 100; i++) {
    /*numbers[i] = generadorLinealCongruente(X0, a, c, m);
    X0 = numbers[i-1];*/
    numbers[i] = Math.floor((Math.random() * 10) + 1);
  }
  for (var i = 0; i < numbers.length; i++){
    counts[numbers[i]] = (counts[numbers[i]] + 1) || 1;
  }
  var array = $.map(counts, function(value, index) {
    return [value];
  });
  console.log(counts);
  console.log(array);
  return array;
}

function generadorLinealCongruente(X0, a, c, m) {
  var Xn = (a * X0 + c) % m;
  return Xn;
}

$(function () {
    var chartScatter = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'scatter'
        },
        
        series: [{
            name: 'Numeros generados',
            data: []
        }]
    });

    var chartBar = new Highcharts.Chart({
        chart: {
            renderTo: 'container2',
            type: 'bar'
        },
        
        series: [{
            name: 'Numeros generados',
            data: []
        }]
    });
    
    // The button action
    $('#change').click(function() {
      var result = generarTabla(0,3,9,100);
      chartScatter.series[0].setData(numbers);
      chartBar.series[0].setData(result);
    });
});