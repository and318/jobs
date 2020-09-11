const BASE_URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?"
// $(function () {
//     getJobs("javascript","Netherland");
// });

//usando then/catch
// function getJobs(type,location){
//     axios.get(`${BASE_URL}description=${type}&location=${location}`)
//     .then((response)=> {
//         console.log(response);
//     })
//     .catch((error)=> {
//         console.log(error);
//     })
// }
window.onload = function () {
    clean();
}

function clean() {

    var tech = $("#jobType").val();
    var place = $("#place").val();

    $(function () {
        $("#buscar").click(e => {

            getJobs();
        });
    });
    console.log(tech);
    console.log(place);


    //Usando async/wait 
    async function getJobs(type, location) {
        $('#lista_jobs').empty();
        try {
            const response = await axios.get(`${BASE_URL}description=${tech}&location=${place}`);
            response.data.forEach((job) => {
                listJob(job);
            })
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
}
function imgError(image) {
    image.onerror = "";
    image.src = "/images/logo.png";
    return true;
}
function listJob(job) {
    var content = `
    
    
    <div class="card mb-3 ml-3" >
                    <div class="row no-gutters">
                        <div class="col-md-4 d-flex justify-content-center align-items-center">
                            <img src="${job.company_logo}" onerror="imgError(this);" class="card-img" alt="logo">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${job.title}</h5>
                                <span>${job.location}</span> <span>${job.type}</span>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${job.id}">
                                Launch demo modal
                                </button>
                                <div class="modal fade" id="${job.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="MdalLabel">Descripción del puesto</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <small>
                                    ${job.description}
                                    </small>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
    
      </div>
    </div>
  </div>
</div>
                                <a class="btn btn-primary btn-small" data-toggle="collapse" href="#${job.id}"
                                        role="button" aria-expanded="false" aria-controls="collapseExample">
                                        Ver más
                                    </a>
                                    
                                
                                <div class="collapse" id="${job.id}">
                                    <small>
                                    ${job.description}
                                    </small>
                                </div>
                                <p class="card-text reduce"><small>sss</small></p>
                                <p class="card-text"><small class="text-muted">${job.created_at}</small></p>
                            </div>
                        </div>
                    </div>
                </div>

    
    
    
    
    
    
    `
    $(`#lista_jobs`).append(content);
}

