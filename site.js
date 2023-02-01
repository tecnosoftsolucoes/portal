const bootstrap = require('bootstrap');
require('./bootstrap');
require('inputmask');

Inputmask().mask(document.querySelectorAll("input"));

window.TipoDocumento = function(sel) {
    if (sel == 'F'){
        Inputmask('999.999.999-99',{KeepStatic: true, placeholder: ' '}).mask(document.getElementById('DOCUM1'));
    } else {
        Inputmask('99.999.999/9999-99',{KeepStatic: true, placeholder: ' '}).mask(document.getElementById('DOCUM1'));
    }
}

import Alpine from 'alpinejs'
window.Alpine = Alpine

Alpine.start()


window.site = function(){
    return {
        pagina: ' ',
        bsCollapse: {},
        mobCollapse: {},
        inicia(){
            this.pagina = 'principal';
            this.bsCollapse = new bootstrap.Collapse('#MenuSolucoes', {
                toggle: false
              });
            this.mobCollapse = new bootstrap.Collapse('#SolucoesMobile',{
                toggle: false
              });

        },
        menu(valor){
            this.pagina = valor;
            if(valor == 'principal' || valor == 'empresa' || valor == 'cursos' || valor == 'contato'){
                this.bsCollapse.hide();
            }
            if(valor == 'principal' || valor == 'empresa' || valor == 'cursos' || valor == 'contato'){
                this.mobCollapse.hide();
            }
        },
    }
}
window.formContato = function(dados){
    var enviar = false;

    var nome = document.getElementById('nome');
    nome.classList.remove('is-invalid');
    nome.classList.remove('is-valid');
    if (nome.value.length == 0){
        enviar = false;
        nome.classList.add('is-invalid');
    } else {
        nome.classList.add('is-valid');
    }

    var email = document.getElementById('email');
    email.classList.remove('is-invalid');
    email.classList.remove('is-valid');
    if (email.value.length == 0){
        enviar = false;
        email.classList.add('is-invalid');
    } else {
        email.classList.add('is-valid');
    }

    var fone = document.getElementById('fone');
    fone.classList.remove('is-invalid');
    fone.classList.remove('is-valid');
    if (fone.value.length == 0){
        enviar = false;
        fone.classList.add('is-invalid');
    } else {
        fone.classList.add('is-valid');
    }

    var msg = document.getElementById('msg');
    msg.classList.remove('is-invalid');
    msg.classList.remove('is-valid');
    if (msg.value.length == 0){
        enviar = false;
        msg.classList.add('is-invalid');
    } else {
        msg.classList.add('is-valid');
    }

    var cb1 = document.getElementById('distribuidor');
    var cb2 = document.getElementById('industria');
    var cb3 = document.getElementById('comercio');
    var cb4 = document.getElementById('servicos');
    var cb5 = document.getElementById('autopecas');
    var cb6 = document.getElementById('agropecuaria');
    var cb6 = document.getElementById('matcon');
    var cb7 = document.getElementById('cerealista');
    var validation = document.getElementById('validacao');

    if(cb1.checked == true || cb2.checked == true || cb3.checked == true || cb4.checked == true || cb5.checked == true || cb6.checked == true || cb7.checked == true){
        enviar = true
        validation.classList.add('d-none');
    } else{
        validation.classList.remove('d-none');
    }
    console.log(cb1.checked);

    if (enviar){
        axios.post('/wsite/enviarcontato',dados)
        .then(resp=>{
            console.log("B");
            if (resp.data == 'ok'){
                toastr.success('Dados enviados com sucesso.','Enviado!');
            } else {
                toastr.error('Preencha os campos que estão faltando.','Não enviado!');
            }
        })
        .catch(function(error){
            console.log(error);
        })
        .then(function(){
            console.log('fim');
        })
    }
}
window.toastr.error = function(mensagem,titulo){
    html = '    <div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">'+
    '        <div class="toast-header bg-danger bg-gradient text-dark">'+
    '            <i class="mdi mdi-24px mdi-alert-circle-outline"></i>'+
    '               <strong class="me-auto">'+titulo+'</strong>'+
    // '               <small>11 mins ago</small>'+
    '               <button type="button" class="text-white btn-close" data-bs-dismiss="toast" aria-label="Close"></button>'+
    '        </div>'+
    '        <div class="toast-body"><i class="mdi mdi-24px mdi-alert-circle-outline"></i>'+
    '            '+mensagem+
    '        </div>'+
    '    </div>'+
    '</div>';
    toastr(html);
}

window.toastr.alert = function(mensagem,titulo){
    html = '    <div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">'+
    '        <div class="toast-header bg-warning bg-gradient text-dark">'+
    '            <i class="mdi mdi-24px mdi-alert-circle-outline"></i>'+
    '               <strong class="me-auto">'+titulo+'</strong>'+
    // '               <small>11 mins ago</small>'+
    '               <button type="button" class="text-white btn-close" data-bs-dismiss="toast" aria-label="Close"></button>'+
    '        </div>'+
    '        <div class="toast-body"><i class="mdi mdi-24px mdi-alert-circle-outline"></i>'+
    '            '+mensagem+
    '        </div>'+
    '    </div>'+
    '</div>';
    toastr(html);
}
window.toastr.success = function (mensagem, titulo){
    html = '    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">'+
    '        <div class="toast-header bg-success bg-gradient text-white">'+
    '            <i class="mdi mdi-24px mdi-shield-check" ></i>'+
    '               <strong class="me-auto">'+titulo+'</strong>'+
    // '               <small>11 mins ago</small>'+
    '               <button type="button" class="text-white btn-close" data-bs-dismiss="toast" aria-label="Close"></button>'+
    '        </div>'+
    '        <div class="toast-body">'+
    '            '+mensagem+
    '        </div>'+
    '    </div>'+
    '</div>';
    toastr(html);
}
