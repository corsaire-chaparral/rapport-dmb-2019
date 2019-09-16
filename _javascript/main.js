document.addEventListener('DOMContentLoaded', () => {
  var charts = {};

//  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var data = {
    question1: [
      5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 1, 5, 5, 5, 5, 5, 5, 1, 4, 4, 5, 4, 4, 5, 4, 5, 5, 5, 5, 4, 4, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 3, 5, 5, 4, 5, 5, 4, 5, 5, 5, 5, 5, 3, 1, 5, 5, 5, 4, 5, 5, 2, 4, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 4, 1, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 4, 4, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 4, 5, 5, 4, 5, 5, 5, 4, 5, 4, 5, 5, 5, 4, 5, 5
    ]
  };
  
  var color = Chart.helpers.color;
  var barChartData = {
    labels: ['1', '2', '3', '4', '5', 'S/O'],
    datasets: [{
      label: 'Question 1',
      backgroundColor: [
        color('#d83a29').alpha(0.85).rgbString(),
        color('#ed7438').alpha(0.85).rgbString(),
        color('#cbe043').alpha(0.85).rgbString(),
        color('#8bd14f').alpha(0.85).rgbString(),
        color('#45962a').alpha(0.85).rgbString()
      ],
      borderColor: '#ff6900',
      borderWidth: 1,
      data: [
        occurrences(data.question1, 1),
        occurrences(data.question1, 2),
        occurrences(data.question1, 3),
        occurrences(data.question1, 5),
        occurrences(data.question1, 1),
        occurrences(data.question1, 'S/O')
      ]
    },
//               {
//      label: 'Dataset 2',
//      backgroundColor: color('#0000ff').alpha(0.5).rgbString(),
//      borderColor: '#0000ff',
//      borderWidth: 1,
//      data: [
//        '5', '4', '4',
//        '1', '2', '2', '2'
//      ]
//    }
              ]
  };
  
  var sections = document.querySelectorAll('.canvas-question');

  sections = Array.prototype.slice.call(sections); // arrayify

  sections.forEach(function (section, i) {
    let ctx = section.querySelector('canvas').getContext('2d');

    let rawdata = section.querySelector('script')
      .innerHTML
      .replace(/\s/g, '')
      .split(',');
    
    console.log('rawdata', rawdata)
    let customLabels = section.querySelector('script').getAttribute('data-labels');

    let labels = customLabels ? customLabels.split(',') : ['1', '2', '3', '4', '5', 'S/O']

    charts[section.getAttribute('id')] = new Chart(ctx, {
      data: {
        labels:  labels,
        datasets: [{
          backgroundColor: [
            color('#d83a29').alpha(0.85).rgbString(),
            color('#ed7438').alpha(0.85).rgbString(),
            color('#cbe043').alpha(0.85).rgbString(),
            color('#8bd14f').alpha(0.85).rgbString(),
            color('#45962a').alpha(0.85).rgbString(),
            color('#999999').alpha(0.85).rgbString()
          ],
          borderColor: [
            '#d83a29',
            '#ed7438',
            '#cbe043',
            '#8bd14f',
            '#45962a',
            '#999999'
          ],
          borderWidth: 1,
          data: returnData(rawdata, labels)
        }]
      },
      type: 'doughnut',
      options: {
        title: {
          display: false
        },
        legend: {
          position: 'right'
        }
      }
    });
  });
  
  function occurrences(collection, match) {
    let r = 0
    for (var i = 0; i < collection.length; i++) {
      if (!match) {
        return collection.length;
      }
      if (collection[i] === match) {
        r++
      }
    }
    
    return r;
  }
  
  function returnData(rawData, labels) {
    var toReturn = [];
    
    labels = labels ||  ['1', '2', '3', '4', '5', 'S/O'];
    
    labels.forEach(function (label) {
      toReturn.push(occurrences(rawData, label))
    });
    
    return toReturn;
  }
});
