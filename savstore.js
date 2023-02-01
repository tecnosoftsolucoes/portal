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

window.contrato = function(){
    return {
        confirmado: '',
        confirmar(){
            id = document.getElementById('id_cont').value;
            fetch('/savstore/contrato/confirmar/'+id);
        }
    }
}

window.checkout = function(_email){
    return {
        funcao: 'COMPRA', retorno: '',
        nome: '', cartao: '', cvc: '', doc: '', mes: '', ano: '', email: _email, tipo: '', bandeira: '',
        descricao: '',
        valorTotal:0, opcaoCompra: 0, creditos: 0,
        calculaTotal(){
            if (this.opcaoCompra == 0){
                this.valorTotal = 0;
            } else if (this.opcaoCompra == 1){
                this.descricao = 'Apenas uma Nota Fiscal';
                document.getElementById('productDescription').value = 'Crédito de Uma Nota Fiscal';
                document.getElementById('creditos').value = '1';
                this.valorTotal = 30.0;
            } else if (this.opcaoCompra == 2){
                this.descricao = 'Duas Notas Fiscais';
                document.getElementById('productDescription').value = 'Crédito de Duas Notas Fiscais';
                document.getElementById('creditos').value = '2';
                this.valorTotal = 40.0;
            } else if (this.opcaoCompra == 3){
                this.descricao = 'Três Notas Fiscais';
                document.getElementById('productDescription').value = 'Crédito de Três Notas Fiscais';
                document.getElementById('creditos').value = '3';
                this.valorTotal = 50.0;
            } else if (this.opcaoCompra == 4){
                this.descricao = 'Dez Notas Fiscais';
                document.getElementById('productDescription').value = 'Crédito de Dez Notas Fiscais';
                document.getElementById('creditos').value = '10';
                this.valorTotal = 100.0;
            } else if (this.opcaoCompra == 5){
                this.descricao = 'Vinte Notas Fiscais';
                document.getElementById('productDescription').value = 'Crédito de Vinte Notas Fiscais';
                document.getElementById('creditos').value = '20';
                this.valorTotal = 160.0;
            } else {
                this.valorTotal = 0;
            }
        },
        validaCampos(){
            return this.opcaoCompra > 0 && this.nome.length > 0 && this.cartao.length > 0 && this.cvc.length > 0 && this.doc.length > 0 && this.mes.length > 0 && this.ano.length > 0 && this.email.length > 0 && this.tipo.length > 0;
        }

    }//fim return
}//fim window

window.savstore = function(selec){
    return {
        idSelecionado: selec,
        funcao: 'CONTRATO', msg: 1, msgErro: '', msgSucesso: '',
        email: '', csrf: '', emailvalido: false,
        nome: '', password: '', confirm: '',
        cnpj: '', docum2: '', razao: '', fantasia: '', cep: '', endereco: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', codcidade: '', telefone1: '', telefone2: '', telefone3: '', aceitoContrato: false, confirmoDados: false,
        obs1: '', obs2: '',
        bDocum2: false, bRazao: false, bFantasia: false, bCep: false, bEndereco: false, bNumero: false, bBairro: false, bCidade: false, bEstado: false,
        CNPJBaixado: false, CNPJValidado: false, dataBaixa: '', erroConsulta: false,
        produtos: [],
        selecionado: -1,
        licencas: 1,
        nfe: false,
        valorLicencas: 0, valorContrato: 0, registroSelecionado: [], empresa: {},
        buscaProdutos(){
            fetch('/get/store/produtos')
            .then(res => res.json())
            .then(data => {
                this.produtos = data;
                if (this.idSelecionado > 0){
                    this.selecionado = this.idSelecionado;
                    this.registroSelecionado = this.produtos.find(reg => reg.ID_PROD == this.idSelecionado);
                    this.calculaTotal;
                }
            });
        },
        ValidaDadosIniciais(){
            return this.nome.length > 0 && this.email.length > 0 && this.emailvalido == true && this.password.length > 5 && this.password == this.confirm && this.selecionado > 0;
        },
        FormatData(data){
            if (data == null || data.substring(0,4) == '1899'){
                return '';
            } else {
                const _data = new Date(data);
                return new Intl.DateTimeFormat('pt-BR',{timeZone: 'UTC'}).format(_data);
            }
        },
        cnpjValido(){
            this.docum2 = '';
            this.razao = '';
            this.fantasia = '';
            this.cep = '';
            this.endereco = '';
            this.numero = '';
            this.bairro = '';
            this.cidade = '';
            this.estado = '';
            this.codcidade = '';
            this.CNPJValidado = false;
            this.CNPJBaixado = false;
            this.erroConsulta = false;

            if (this.cnpj.length == 14){
                document.getElementById("loading").classList.remove("d-none");
                this.bDocum2 = false;
                this.bRazao = false;
                this.bFantasia = false;
                this.bCep = false;
                this.bEndereco = false;
                this.bNumero = false;
                this.bBairro = false;
                this.bCidade = false;
                this.bEstado = false;

                var prod = this.produtos.find(reg => reg.ID_PROD == this.selecionado);
                //console.log(prod);

                fetch('/savstore/begincheckout', {method: "POST", headers: {'Accept': 'application/json','Content-Type': 'application/json'},  body: JSON.stringify({codigo: '357951', id_prod: this.registroSelecionado.ID_PROD, nfe: this.nfe, licencas: this.licencas, email: this.email, nome: this.nome, cnpj: this.cnpj})} )
                .then(res => res.json())
                .then(data => {
                    //this.empresa = JSON.parse(data.result[0]);
                    this.empresa = data;
                    if (this.empresa.razaosocial == ''){
                        this.erroConsulta = true;
                        this.CNPJValidado = false;
                    } else {
                        this.docum2 = this.empresa.docum2;
                        this.razao = this.empresa.razaosocial;
                        this.fantasia = this.empresa.nomefantasia;
                        this.cep = this.empresa.cep;
                        this.endereco = this.empresa.endereco;
                        this.numero = this.empresa.numero;
                        this.bairro = this.empresa.bairro;
                        this.cidade = this.empresa.cidade;
                        this.estado = this.empresa.estado;
                        this.codcidade = this.empresa.codcidade;
                        this.bDocum2 = (this.docum2.length > 0);
                        this.bRazao = (this.razao.length > 0);
                        this.bFantasia = (this.fantasia.length > 0);
                        this.bCep = (this.cep.length > 0);
                        this.bEndereco = (this.endereco.length > 0);
                        this.bNumero = (this.numero.length > 0);
                        this.bBairro = (this.bairro.length > 0);
                        this.bCidade = (this.cidade.length > 0);
                        this.bEstado = (this.estado.length > 0);
                        this.obs2 = 'CNAE: '+this.empresa.cnae+' - CRT: '+this.empresa.crt+' - Inicio das Atividade: '+this.FormatData(this.empresa.inicio)+' Situação Contribuinte: '+(this.empresa.situacao == 1 ? 'Habilitado' : 'Não Habilitado')+' Data Situacao: '+this.FormatData(this.empresa.ultSituacao);
                        this.CNPJValidado = true;
                    }
                    document.getElementById("loading").classList.add("d-none");
                }).catch(function (error) {
                    document.getElementById("loading").classList.add("d-none");
                    this.erroConsulta = true;
                    this.CNPJValidado = false;
                });

            }
        },
        buscaRegistro(){
            this.registroSelecionado = this.produtos.find(reg => reg.ID_PROD == this.selecionado);
            this.calculaTotal();
        },
        calculaTotal(){
            if (this.licencas < 4){
                this.valorLicencas = Number(this.licencas - 1) * 30.0;
            } else {
                this.valorLicencas = 78.0
            }
            this.valorContrato = Number(this.registroSelecionado.preco) + Number(this.valorLicencas) + Number(this.nfe == true ? 30.0 : 0);
        },
        testaNome() {
            if (this.nome == ''){
                document.getElementById("naoExibe").classList.add('is-invalid');
            }
        },
        validaCampos(){
            var valido = this.nome.length > 0 && this.email.length > 0 && this.emailvalido == true && this.password.length > 5 && this.password == this.confirm && this.selecionado > 0 && this.CNPJValidado && this.razao.length > 0 && this.fantasia.length > 0 && this.cep.length > 0 && this.endereco.length > 0 && this.numero.length > 0 &&  this.bairro.length > 0 && this.cidade.length > 0 && this.estado.length > 0 && (this.telefone1.length > 0 || this.telefone2.length > 0 || this.telefone3.length > 0) && this.aceitoContrato == true && this.confirmoDados == true;
            return valido;
        },
        testaRazao(){
            document.getElementById("razao").classList.remove(this.razao == '' ? 'is-valid' : 'is-invalid');
            document.getElementById("razao").classList.add(this.razao == '' ? 'is-invalid' : 'is-valid');
        },
        testaDocum2(){
            document.getElementById("docum2").classList.remove(this.docum2 == '' ? 'is-valid' : 'is-invalid');
            document.getElementById("docum2").classList.add(this.docum2 == '' ? 'is-invalid' : 'is-valid');
        },
        testaFantasia(){
            document.getElementById("fantasia").classList.remove(this.fantasia == '' ? 'is-valid' : 'is-invalid');
            document.getElementById("fantasia").classList.add(this.fantasia == '' ? 'is-invalid' : 'is-valid');
        },
        testaEndereco(){
            document.getElementById("endereco").classList.remove(this.endereco == '' ? 'is-valid' : 'is-invalid');
            document.getElementById("endereco").classList.add(this.endereco == '' ? 'is-invalid' : 'is-valid');
        },
        testaNumero(){
            document.getElementById("numero").classList.remove(this.numero == '' ? 'is-valid' : 'is-invalid');
            document.getElementById("numero").classList.add(this.numero == '' ? 'is-invalid' : 'is-valid');
        },
        testaBairro(){
            document.getElementById("bairro").classList.remove(this.bairro == '' ? 'is-valid' : 'is-invalid');
            document.getElementById("bairro").classList.add(this.bairro == '' ? 'is-invalid' : 'is-valid');
        },
        testaCidade(){
            document.getElementById("cidade").classList.remove(this.cidade == '' ? 'is-valid' : 'is-invalid');
            document.getElementById("cidade").classList.add(this.cidade == '' ? 'is-invalid' : 'is-valid');
        },
        testaEstado(){
            document.getElementById("estado").classList.remove(this.estado == '' ? 'is-valid' : 'is-invalid');
            document.getElementById("estado").classList.add(this.estado == '' ? 'is-invalid' : 'is-valid');
        },
        testaCep(){
            document.getElementById("cep").classList.remove(this.cep == '' ? 'is-valid' : 'is-invalid').add(this.cep == '' ? 'is-invalid' : 'is-valid');
        },
        testaEmail() {
            if (this.email == ''){
                document.getElementById("emailusuario").classList.add('is-invalid');
            } else {
                fetch('/user/verificaemail', {method: "POST", body: new FormData(document.getElementById("formCadastro")) } )
                .then(res => res.json())
                .then(data => {
                    this.emailvalido = (data == 0);
                    if (this.emailvalido){
                        document.getElementById("alertemail").classList.add("d-none");
                        document.getElementById("emailusuario").classList.remove("is-invalid");
                        document.getElementById("emailusuario").classList.add("is-valid");
                    } else {
                        document.getElementById("emailusuario").classList.remove("is-valid");
                        document.getElementById("emailusuario").classList.add("is-invalid");
                        document.getElementById("alertemail").classList.remove("d-none");
                    }
                });
            }
        },
        efetivaContrato(){
            let s = this;
            setTimeout(function run() {
                if (s.msg < 7){
                    s.msg++;
                } else {
                    s.msg = 1;
                }
                setTimeout(run, 3000);
            }, 3000);

            this.funcao = 'DOWNLOAD'

            player.playVideo();

            fetch('/savstore/efetivacontrato', {method: "POST", headers: {'Accept': 'application/json','Content-Type': 'application/json'},  body: JSON.stringify({codigo: '357951', id_prod: this.registroSelecionado.ID_PROD, valorContrato: this.valorContrato, nfe: this.nfe, licencas: this.licencas, email: this.email, nome: this.nome, password: this.password, cnpj: this.cnpj, razao: this.razao, fantasia: this.fantasia, endereco: this.endereco, numero: this.numero, cep: this.cep, complemento: this.complemento, bairro: this.bairro, cidade: this.cidade, estado: this.estado, codcidade: this.codcidade, telefone1: this.telefone1, telefone2: this.telefone2, telefone3: this.telefone3, docum2: this.docum2, observacao: this.obs1+' '+this.obs2 })} )
            .then(res => res.json())
            .then(data => {
                if (data == '1'){
                    this.msgSucesso = 'Você acaba de adquirir um produto de excelência! Nós enviamos para o email '+this.email+' as informações deste contrato e também um link para Download de seu produto';
                } else if (data == '9'){
                    this.msgErro = 'Infelizmente tivemos um probleminha com o cadastro, Identificamos que o CNPJ já esta cadastrado, necessário contatar a TECNOSOFT para verificar como prosseguir';
                } else {
                    this.msgErro = 'Infelizmente tivemos um probleminha com o cadastro, aguarde que nossa equipe entrará em contato para resolver o mais breve possível, obrigado pela confiança na TECNOSOFT | '+data;
                }
            });
        },
    }
}

