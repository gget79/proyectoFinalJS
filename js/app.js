//Declaración del NameSpace
var moduleCalculator = {};

//Implementación del módulo
moduleCalculator = (function(){
  //declaración de variables globales al modulo
  var buttoms = [];
  var display;
  var value1, value2;
  var tempValue;
  var operation1 = "";
  var operation2 = "";
  var $this = this; //variable que contextualizará el objeto en ejecución

  //Métodos privados
  function sumValues(val1 ,val2) {
      return val1 + val2;
  }
  function subsValues(val1 ,val2) {
      return val1 - val2;
  }
  function multValues(val1 ,val2) {
      return val1 * val2;
  }
  function divValues(val1 ,val2) {
    try{
      var resultado = val1 / val2;
    } catch (err) {
      alert("Existe un error" + " - " + err.message);
    }
      return resultado;
  }
  function initValues(){
    $this.value1 = 0;
    $this.value2 = 0;
    $this.operation1 = "";
    $this.operation2 = "";
    $this.countDigits = 0;
    $this.tempValue = "";
    setDisplay("0", "sobreescribir");
  }
  function setDisplay(avalue, modo){
    switch (modo) {
      case "sobreescribir":
        if (avalue.length > 8){
          $this.display.innerHTML = avalue.substring(0,8);
        } else {
          $this.display.innerHTML = avalue;
        }
        break;
      case "concatenar":
        if ($this.tempValue.length <= 8){
          $this.display.innerHTML += avalue;
        } else {
          $this.display.innerHTML = $this.tempValue.substring(0,8);
        }
        break;
    }
  }
  function initComponents(){
    $this.buttoms = document.getElementsByClassName('tecla');
    $this.display = document.getElementById('display');
    setEvents($this.buttoms);
    initValues();
  }
  function setEvents(abuttoms){
    for (var i in abuttoms) {
      abuttoms[i].onclick = actionKey;
      abuttoms[i].onmouseout = zoomOut;
    }
  }
  function actionKey(event){
    zoomIn(event);

    if (validateNumber(event.currentTarget.alt)){
      if ($this.display.innerHTML != "0" && $this.tempValue.length > 0) {
        setDisplay(event.currentTarget.alt, "concatenar");
      } else if ($this.value2 === 0) {
        setDisplay(event.currentTarget.alt, "sobreescribir");
      }

      if ($this.display.innerHTML != "0") {
        $this.tempValue +=  event.currentTarget.alt;
      }
    }
    switch (event.currentTarget.alt) {
      case "On":
        initValues();
        break;
      case "signo":
          if ($this.display.innerHTML != "0") {
            setDisplay((controlSigns($this.display.innerHTML, event.currentTarget.alt)),"sobreescribir");
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
          setDisplay((controlSigns($this.display.innerHTML, event.currentTarget.alt)),"sobreescribir");
          break;
      case "igual":
          setOperation();
          break;
      case "raiz":
          alert('Función no implementada en esta iteración');
          break;
    }
  }
  function setValues(event){
    assignVariablesValues();
    if ($this.operation1.length === 0 && $this.operation2.length === 0){
      $this.operation1 = event.currentTarget.alt;
    }else {
      $this.operation2 = event.currentTarget.alt;
    }
    initBuffer();
  }
  function initBuffer() {
    $this.tempValue = "";
    setDisplay("","sobreescribir");
  }
  function zoomIn(event){
    var id = event.currentTarget.attributes.id.value;
    if (id != "mas") {
      document.getElementById(id).style="width:76.8667px;height:61.9167px;";
    }
  }
  function zoomOut(event){
    var id = event.currentTarget.attributes.id.value;
    if (id != "mas"){
      document.getElementById(id).style="width:77.8667px;height:62.9167px;";
    }
  }
  function validateNumber(anumber){
    var asciiCode = anumber.charCodeAt(0);
    if (asciiCode >= 48 && asciiCode <=57){
      return true;
    }
    return false;
  }
  function setOperation(){
    assignVariablesValues()
    switch ($this.operation1) {
      case "mas":
        $this.value1 = sumValues($this.value1, $this.value2);
        changeValuesForNewOperation()
        break;
      case "menos":
        $this.value1 = subsValues($this.value1, $this.value2);
        changeValuesForNewOperation()
        break;
      case "por":
        $this.value1 = multValues($this.value1,$this. value2);
        changeValuesForNewOperation()
        break;
      case "dividido":
        $this.value1 = divValues($this.value1, $this.value2);
        changeValuesForNewOperation()
        break;
      }
  }
  function changeValuesForNewOperation(){
    $this.value2 = 0;
    if ($this.operation1.length > 0 && $this.operation2.length > 0) {
      $this.operation1 = $this.operation2;
      $this.operation2 = "";
    } else {
      $this.operation1 = "";
      $this.operation2 = "";
    }
    setDisplay($this.value1.toString(),"sobreescribir");
    $this.tempValue = "";
  }
  function assignVariablesValues(){
    if (!(pendingOperation())) {
      if ($this.value1 == 0 && $this.value2 == 0) {
        $this.value1 = Number($this.tempValue);
      } else {
        $this.value2 = Number($this.tempValue);
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
        $this.tempValue = newstringOcc;
        $this.value1 = 0;
      }
    }
    else{
      if (charOcc === "."){
        newstringOcc = newstringOcc + charOcc;
        $this.tempValue = newstringOcc;
      }else if (charOcc === "-") {
        newstringOcc = charOcc + newstringOcc;
        $this.tempValue = newstringOcc;
        $this.value1 = 0;
      }
    }
    return(newstringOcc);
  }
  function pendingOperation(){
    if ($this.value1 != 0 && $this.value2 != 0){
      return true
    }
    return false;
  }

  //Métodos públicos
  return {
    initComponents: initComponents
  }
})();

//Área de proceso
moduleCalculator.initComponents();
