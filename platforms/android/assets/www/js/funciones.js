 function redir(url){
  //Te redirige a url
  window.location.href = url;

}

function enviarAjax(donde,jsonData,callback=false){
  var jqXHR = $.ajax({
    url:donde,
    data:jsonData,
    type: "POST",
    dataType: "HTML",
    success: function(json){
      if(json!="false"){
        console.log(json);
        alert("La operacion fue exitosa");
        calback(json);

      }else{
        alert("Hubo un error en el sistema, por favor intentelo nuevamente más tarde");
        console.log(json+"1");
      }
    },
    error: function(jqXHR, stt, error){
      resp = "Hubo un error en el sistema, por favor intentelo nuevamente mas tarde.";
      console.log(error);
      alert(resp);
    }
  }).done(function(json){

  });
}

//---------------Seleccionar el alumno

$("#btn-dni").on('click',function(){alumnoSeleccionar();});
$("#form-dni").submit(function(event){
  alumnoSeleccionar();
  return false;
});

function alumnoSeleccionar(){
  var alumno= JSON.stringify({
    dni:$("#dni").val()
  });
  enviarAjax("http://192.168.3.130/kiosco_php/ajax/alumno_seleccionar.php",{alumno:alumno},RenderView.renderBody);
}