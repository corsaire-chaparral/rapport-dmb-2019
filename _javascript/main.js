document.addEventListener('DOMContentLoaded', () => {
  var charts = {};

//  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var data = {
    question1: [
      5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 1, 5, 5, 5, 5, 5, 5, 1, 4, 4, 5, 4, 4, 5, 4, 5, 5, 5, 5, 4, 4, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 3, 5, 5, 4, 5, 5, 4, 5, 5, 5, 5, 5, 3, 1, 5, 5, 5, 4, 5, 5, 2, 4, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 4, 1, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 4, 4, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 4, 5, 5, 4, 5, 5, 5, 4, 5, 4, 5, 5, 5, 4, 5, 5
    ]
  };
  
  var color = Chart.helpers.color;
  
  var sections = document.querySelectorAll('.canvas-question');

  sections = Array.prototype.slice.call(sections); // arrayify

  sections.forEach(function (section, i) {
    let ctx = section.querySelector('canvas').getContext('2d');

    let rawdata = section.querySelector('script')
      .innerHTML
      .replace(/\s/g, '')
      .split(',');
    
    let customLabels = section.querySelector('script').getAttribute('data-labels');

    let labels = customLabels ? customLabels.split(',') : ['1', '2', '3', '4', '5', 'S/O']
    
    console.log('rawdata occurrences', returnData(rawdata, labels)[1])
    let labelsWithNumbers = [];
    
    labels.forEach(function (label, i) {
      labelsWithNumbers.push(label + ' (' + Math.round((returnData(rawdata, labels)[i]) / rawdata.length * 100) + '%)')
    });

    charts[section.getAttribute('id')] = new Chart(ctx, {
      data: {
        labels:  labelsWithNumbers,
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
        tooltips: {
          mode: 'index'
        },
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
