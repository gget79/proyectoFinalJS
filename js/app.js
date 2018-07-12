//declaración de variables
var buttoms = [];
var display;
var value1, value2;
var tempValue;
var operation1 = "";
var operation2 = "";
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
  operation1 = "";
  operation2 = "";
  countDigits = 0;
  tempValue = "";
  setDisplay("0", "sobreescribir");
  //display.innerHTML="0";
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

  if (validateNumber(event.currentTarget.alt)){
    /*if (display.innerHTML != "0" && value1==0 && value2==0 && operation1.length==0 &&
        operation2.length==0) {*/
    if (display.innerHTML != "0" && tempValue.length > 0) {
      setDisplay(event.currentTarget.alt, "concatenar");
      //display.innerHTML +=  event.currentTarget.alt;
    } else if (value2 === 0) {
      setDisplay(event.currentTarget.alt, "sobreescribir");
      //display.innerHTML =  event.currentTarget.alt;
    }

    if (display.innerHTML != "0") {
      tempValue +=  event.currentTarget.alt;
    }
  }
  //debugger;
  switch (event.currentTarget.alt) {
    case "On":
      initValues();
      break;
    case "signo":
        if (display.innerHTML != "0") {
          setDisplay((controlSigns(display.innerHTML, event.currentTarget.alt)),"sobreescribir");
          //display.innerHTML = controlSigns(display.innerHTML, event.currentTarget.alt);
        }
      break;
    case  "mas":
      setValues(event);
        if (pendingOperation()) {
          setOperation();
        }
      break;
    case  "menos":
      setValues(event);
      if (pendingOperation()) {
        setOperation();
      }
      break;
    case  "por":
      setValues(event);
      if (pendingOperation()) {
        setOperation();
      }
        break;
    case  "dividido":
      setValues(event);
      if (pendingOperation()) {
        setOperation();
      }
      break;
    case "punto":
        setDisplay((controlSigns(display.innerHTML, event.currentTarget.alt)),"sobreescribir");
        //display.innerHTML = controlSigns(display.innerHTML, event.currentTarget.alt);
        break;
    case "igual":
        setOperation();
        break;
  }
};

function setValues(event){
  assignVariablesValues();
  if (operation1.length === 0 && operation2.length === 0){
    operation1 = event.currentTarget.alt;
  }else {
    operation2 = event.currentTarget.alt;
  }
  initBuffer();
}

function initBuffer() {
  tempValue = "";
  setDisplay("","sobreescribir");
  //display.innerHTML =  "";
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
  switch (operation1) {
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
  if (operation1.length > 0 && operation2.length > 0) {
    operation1 = operation2;
    operation2 = "";
  } else {
    operation1 = "";
    operation2 = "";
  }
  setDisplay(value1.toString(),"sobreescribir");
  //display.innerHTML = value1;
  tempValue = "";
}

function assignVariablesValues(){
  if (!(pendingOperation())) {
    if (value1 == 0 && value2 == 0) {
      value1 = Number(tempValue);
    } else {
      value2 = Number(tempValue);
    }
  }
}

function controlSigns(stringOcc, charOcc){
  var newstringOcc = stringOcc;

  switch (charOcc) {
    case "punto":
      charOcc = ".";
      break;
    case "signo":
      charOcc = "-";
      break;
  }
  if (newstringOcc.indexOf(charOcc) != -1 ) {
    if (charOcc === "-") {
      newstringOcc = newstringOcc.substring(1, (newstringOcc.length));
      tempValue = newstringOcc;
      //value1 = Number(tempValue);
      value1 = 0;
    }
  }
  else{
    if (charOcc === "."){
      newstringOcc = newstringOcc + charOcc;
      tempValue = newstringOcc;
    }else if (charOcc === "-") {
      newstringOcc = charOcc + newstringOcc;
      tempValue = newstringOcc;
      //value1 = Number(tempValue);
      value1 = 0;
    }
  }
  return(newstringOcc);
}

function setDisplay(avalue, modo){
  switch (modo) {
    case "sobreescribir":
      if (avalue.length > 8){
        display.innerHTML = avalue.substring(0,8);
      } else {
        display.innerHTML = avalue;
      }
      break;
    case "concatenar":
      if (tempValue.length <= 8){
        display.innerHTML += avalue;
      } else {
        display.innerHTML = tempValue.substring(0,8);
      }
      break;
  }
}
function pendingOperation(){
  if (value1 != 0 && value2 != 0){
    return true
  }
  return false;
}
