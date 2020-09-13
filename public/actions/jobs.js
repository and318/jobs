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
        
        try {
            const response = await axios.get(`${BASE_URL}description=${tech}&location=${place}`);
            $('#lista_jobs').empty();
            response.data.forEach((job,index) => {
                listJob(job,index);
                printModal(job,index);
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


function listJob(job,index) {


    var content = `
    <div class="card mb-3 ml-3">
    <div class="row no-gutters">
        <div class="col-md-4 d-flex justify-content-center align-items-center">
            <img src="${job.company_logo}" onerror="imgError(this);" class="card-img" alt="logo">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${job.title}</h5>
                <div class="info">
                    <span><i class="fas fa-map-marker-alt"></i> ${job.location} </span> <span> <i
                            class="fas fa-business-time"></i> ${job.type}</span>
                </div>
                <button type="button" class="btn btn-outline-primary btn-little" data-toggle="modal"
                    data-target="#asdf${index}">
                    Ver más
                </button>
                <p class="card-text ">
                <a href="${job.company_url}" target="_blank"><small>${job.company_url}</small></a></p>
                <p class="card-text">
                
                ${job.how_to_apply}
                </p>
            </div>

        </div>
    </div>
</div>
    `
    $(`#lista_jobs`).append(content);
}
function printModal(job,index) {

    var modal = `   
     <div class="modal fade" id="asdf${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">Descripción del puesto</h5>
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
`
$(`#modal_container`).append(modal);
}
