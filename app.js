const bootstrap = require('bootstrap');
require('./bootstrap');

require('./cadastros');
require('./funcoes');
require('./grade');
require('./usuario');
require('./auxiliares');
require('./backup');
require('./indicacoes');
require('./diretor');
require('./pdfviewer');

require('inputmask');

Inputmask.extendAliases({
    'decimal5': {
      alias: "indianns",
      groupSeparator: ".",
      radixPoint: ",",
      placeholder: "0",
      digits: 5,
    },
    'decimal4': {
        alias: "indianns",
        groupSeparator: ".",
        radixPoint: ",",
        placeholder: "0",
        digits: 4,
    },

    'decimal3': {
        alias: "indianns",
        groupSeparator: ".",
        radixPoint: ",",
        placeholder: "0",
        digits: 3,
    },
    'decimal': {
        alias: "indianns",
        groupSeparator: ".",
        radixPoint: ",",
        placeholder: "0",
        digits: 2,
    },
    'number': {
        alias: "indianns",
        groupSeparator: ".",
        radixPoint: ",",
        placeholder: "0",
        digits: 0,
      }
});

Inputmask().mask(document.querySelectorAll("input"));

window.TipoDocumento = function(sel) {
    if (sel == 'F'){
        Inputmask('999.999.999-99',{KeepStatic: true, placeholder: ' '}).mask(document.getElementById('DOCUM1'));
    } else {
        Inputmask('99.999.999/9999-99',{KeepStatic: true, placeholder: ' '}).mask(document.getElementById('DOCUM1'));
    }
}

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"].menu-reduzido');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

import Chartjs from 'chart.js/auto';
window.Chart = Chartjs;

import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

import Alpine from 'alpinejs'
window.Alpine = Alpine

Alpine.start()





