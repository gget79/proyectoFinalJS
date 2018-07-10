//declaración de variables
var buttoms = [];
var display;
var value1, value2;
var tempValue;
var operation;

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
initValues();

//Área de funciones
function initValues(){
  value1 = 0;
  value2 = 0;
  tempValue = "";
  display.innerHTML="0";
}
function initComponents(){
  //Init numbers
  buttoms = document.getElementsByClassName('tecla');
  display = document.getElementById('display');
  setEvents(buttoms);
};

function setEvents(abuttoms){
  for (var i in abuttoms) {
    abuttoms[i].onclick = actionKey;
    abuttoms[i].onmouseout = zoomOut;
  }
};

function actionKey(event){
  zoomIn(event);

  //debugger;
  if (validateNumber(event.currentTarget.alt)){
    if (display.innerHTML != "0") {
      display.innerHTML +=  event.currentTarget.alt;
    } else if (value2 === 0) {
      display.innerHTML =  event.currentTarget.alt;
    }

    if (display.innerHTML != "0") {
      tempValue +=  event.currentTarget.alt;
    }
  }
  switch (event.currentTarget.alt) {
    case "on":
      initValues();
      break;
    case "sign":

      break;
    case  "mas":
      setValues(event);
      break;
    case  "menos":
      setValues(event);
      break;
    case  "por":
      setValues(event);
        break;
    case  "divido":
      setValues(event);
      break;

    case "punto":

        break;
    case "igual":
        setOperation();
        break;
  }
};

function setValues(event){
  assignVariablesValues();
  operation = event.currentTarget.alt;
  initBuffer();
}

function initBuffer() {
  tempValue = "";
  display.innerHTML =  "";
}

function zoomIn(event){
  var id = event.currentTarget.attributes.id.value;
  if (id != "mas") {
    document.getElementById(id).style="width:76.8667px;height:61.9167px;";
  }
};

function zoomOut(event){
  var id = event.currentTarget.attributes.id.value;
  if (id != "mas"){
    document.getElementById(id).style="width:77.8667px;height:62.9167px;";
  }
};

function validateNumber(anumber){
  var asciiCode = anumber.charCodeAt(0);
  if (asciiCode >= 48 && asciiCode <=57){
    return true;
  }
  return false;
}

function setOperation(){
  assignVariablesValues()
  switch (operation) {
    case "mas":
      var suma= moduleCalculator.get('suma');
      value1 = suma.sumValues(value1, value2);
      changeValuesForNewOperation()
      break;
    case "menos":
      var resta= moduleCalculator.get('resta');
      value1 = resta.subsValues(value1, value2);
      changeValuesForNewOperation()
      break;
    case "por":
      var mult= moduleCalculator.get('mult');
      value1 = mult.multValues(value1, value2);
      changeValuesForNewOperation()
      break;
    case "dividido":
      var divi= moduleCalculator.get('divi');
      value1 = divi.divValues(value1, value2);
      changeValuesForNewOperation()
      break;
    }
}

function changeValuesForNewOperation(){
  value2 = 0;
  display.innerHTML = value1;
  tempValue = "";
}

function assignVariablesValues(){
  if (value1 == 0) {
    value1 = Number(tempValue);
  } else if (value2 == 0) {
    value2 = Number(tempValue);
  }
}
