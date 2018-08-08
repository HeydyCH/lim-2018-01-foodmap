// Función para hacer las conexiones  XHR
const getData = (url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = JSON.parse(xhr.responseText);
      callback(null, data);
    }
  }
  xhr.send();
}

const resulAll = document.getElementById("allRestaurant");
const resulFilter = document.getElementById("filterRestaurant");

getDataGeneral = () => {
  console.log("bajar data de restaurant")
  getData('restaurant.json', (err, data) => {
    resulFilter.innerHTML = " ";
    for(var i in data){
      // resulAll.innerHTML += i + ": " + data[i].name + "->" + data[i].types+ "<br/> ";
      resulAll.innerHTML += `
      <div class="color1 col-xs-12 col-sm-6 col-md-6">
        <img src="${data[i].photo}" alt="" class="img-thumbnail photoRestaurant">
        <br/>
        <center>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModall${i}">${data[i].name}</button>
        </center>
        <br/>
        <div class="modal fade" id="myModall${i}">
          <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header" id="titleAll">
                <h4 class="modal-title"> RESTAURANT : ${data[i].name} </h4>
              </div>
              <div class="modal-body  fondo">
                <p>
                  <strong>Distrito :</strong> ${data[i].district}
                  <br><strong>Direccion :</strong> ${data[i].address}
                  <br><strong>Horario de Atencion:</strong>${data[i].horarios}
                  <br>
                </p>
                <center>
                  <img src="${data[i].photoMap}" alt="" id="mapRestaurant">
                  <br>
                  <br><strong>TIPO DE RESTAURANT : ${data[i].types} </strong>
                </center>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
    }
    // var edadMenor = encontrarEdadmenor(data);
    // resultado.innerHTML += "La edad menor es : " + edadMenor ;
  });
}

getDataFilter = (tipo) => {
  console.log("bajar data de restaurant ")
  resulAll.innerHTML = " ";
  resulFilter.innerHTML = " ";
  getData('restaurant.json', (err, data) => {
    for(var i in data){
        if(data[i].types == tipo){
          // resulFilter.innerHTML += i + ": " + data[i].name + "->" + data[i].types+ "<br/> ";
          resulFilter.innerHTML += `
          <div class="color1 col-xs-12 col-sm-6 col-md-6">
            <img src="${data[i].photo}" alt="" class="img-thumbnail photoRestaurant">
            <br/>
            <center>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal${i}">${data[i].name}</button>
            </center>
            <br/>
            <div class="modal fade" id="myModal${i}">
              <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header" id="title">
                    <h4 class="modal-title"> RESTAURANT : ${data[i].name} </h4>
                  </div>
                  <div class="modal-body fondo">
                  <p>
                    <strong>Distrito :</strong> ${data[i].district}
                    <br><strong>Direccion :</strong> ${data[i].address}
                    <br><strong>Horario de Atencion:</strong>${data[i].horarios}
                    <br>
                  </p>
                    <center>
                      <img src="${data[i].photoMap}" alt="" id="mapRestaurant">
                    </center>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `
        }
    }
  });
}

document.getElementById("verData").addEventListener("click",getDataGeneral)
let select = document.getElementById('select')


 select.addEventListener('change', () => {
      console.log(select.value)

      if (select.value == "mexico") {

        console.log("mostrar cmida mexicana")
        getDataFilter("food mexicana");
        
    
      } else if(select.value == "brasil") {
        console.log("mostrar cmida brasileña")
        getDataFilter("food brasileña");
  
      }else{
        console.log("mostrar cmida peruana")
        getDataFilter("food peruana");

      }
    
    });
