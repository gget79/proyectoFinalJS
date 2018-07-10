//declaración de variables
var buttoms = [];
var display;

//Contenedor de módulos, contiene la lógica necesaria para hacer las veces
// de una fábrica y módulos.
var moduleCalculator = (function(){
    var modules = {};
    return {
        create: function(name, desc) {
            if(modules[name] === undefined) {
                modules[name] = {};
            }
            modules[name].desc = function(){
                return desc;
            }
        },
        append: function(name, module) {
            if(modules[name] === undefined) {
                throw 'Módulo no existe';
            }

            for(var k in module) {
                modules[name][k] = module[k];
            }
        },
        get: function(name) {
            if(modules[name] === undefined) {
                throw 'Módulo no existe';
            }
            return modules[name];
        }
    }
})();

//Registro de los módulos
moduleCalculator.create('suma', {
    name: 'suma',
    description: 'Módulo que contiene la funcionalidad para sumar valores',
    version: '1.0'
});
moduleCalculator.create('resta', {
    name: 'resta',
    description: 'Módulo que contiene la funcionalidad para restar valores',
    version: '1.0'
});
moduleCalculator.create('mult', {
    name: 'multiplicación',
    description: 'Módulo que contiene la funcionalidad para multiplicación valores',
    version: '1.0'
});
moduleCalculator.create('divi', {
    name: 'división',
    description: 'Módulo que contiene la funcionalidad para división valores',
    version: '1.0'
});

//Área de proceso
//Agregando comportamiento a los módulos
moduleCalculator.append('suma', {
    sumValues: function(val1 ,val2) {
        return val1 + val2;
    },
});
moduleCalculator.append('resta', {
    subsValues: function(val1 ,val2) {
        return val1 - val2;
    },
});
moduleCalculator.append('mult', {
    multValues: function(val1 ,val2) {
        return val1 * val2;
    },
});
moduleCalculator.append('divi', {
    divValues: function(val1 ,val2) {
        return val1 / val2;
    },
});

//Inicializando componentes GUI
initComponents();


//Área de funciones
function initComponents(){
  //Init numbers
  buttoms = document.getElementsByClassName('tecla');
  setEvents(buttoms);
  display = document.getElementById('display');
};

function setEvents(abuttoms){
  for (var i in abuttoms) {
    abuttoms[i].onclick = actionKey;
    abuttoms[i].onmouseout = zoomOut;
  }
};

function actionKey(event){
  zoomIn(event);

  debugger;
  if (validateNumber(event.currentTarget.alt)){
    if (display.innerHTML != "0") {
      display.innerHTML +=  event.currentTarget.alt;
    } else {
        display.innerHTML =  event.currentTarget.alt;
    }
  }  
};

function zoomIn(event){
  var id = event.currentTarget.attributes.id.value;
  document.getElementById(id).style="width:76.8667px;height:61.9167px;";
};

function zoomOut(event){
  var id = event.currentTarget.attributes.id.value;
  document.getElementById(id).style="width:77.8667px;height:62.9167px;";
};

function validateNumber(anumber){
  var asciiCode = anumber.charCodeAt(0);
  if (asciiCode >= 48 && asciiCode <=57){
    return true;
  }
  return false;
}

  /*btnTwo = document.getElementById('2');
  btnThree = document.getElementById('3');
  btnFour = document.getElementById('4');
  btnFive = document.getElementById('5');
  btnSix =document.getElementById('6');
  btnSeven = document.getElementById('7');
  btnEight = document.getElementById('8');
  btnNine = document.getElementById('9');
  btnCero = document.getElementById('0');*/

  //Init Operations

function usoMetodos(){

  var suma= moduleCalculator.get('suma');
  console.log(suma.sumValues(2,4));

  var resta= moduleCalculator.get('resta');
  console.log(resta.subsValues(2,4));

  var mult= moduleCalculator.get('mult');
  console.log(mult.multValues(2,4));

  var divi= moduleCalculator.get('divi');
  console.log(divi.divValues(2,4));
}
