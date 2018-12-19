import { CodigoValidacaoService } from './../service/codigo-validacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RecaptchaComponent } from '../recaptcha/recaptcha.component';
import { RelationsDocumentum } from '../enums/RelationsDocumentum';
import { ToastrService } from 'ngx-toastr';
import * as $ from "jquery";

@Component({
  selector: 'app-codigo-validacao',
  templateUrl: './codigo-validacao.component.html',
  styleUrls: ['./codigo-validacao.component.scss']
})
export class CodigoValidacaoComponent implements OnInit {
	protected title: string = "Validar Documento";
	protected lbCodigoValidacao: string = "Código de validação:";
	protected getData;
	protected idCurrent: string;
	protected pdf: string = "";
	protected hidePdf: boolean = true;
	protected urlDql: string = "/dctm-rest/repositories/PGE_DEV1?dql=";
	protected codigoValidacao1: string = null;
	protected codigoValidacao2: string = null;
	protected codigoValidacao3: string = null;
	protected codigoValidacao4: string = null;
	protected lbLimpar: string = "Limpar";
  protected codigoValidacao: string;

  @ViewChild('captchaElem') captchaElem: RecaptchaComponent;

  constructor(private codigoValidacaoService: CodigoValidacaoService, private toastr: ToastrService) {}

	ngOnInit() {
    $('[tabindex=' + 1 + ']').focus();
  }

	tabCodigoValidacao(event: KeyboardEvent) {
		this.resetVariaveis();
		let element = (<HTMLInputElement>event.target);
		let value = element.value;
		let length: number = value.length;
		let key_tab: number = 9;

		// ignorar quando apertar a tecla 'tab'
		if (key_tab == event.keyCode || length < 4) {
			return;
		}

		element.value = value.substr(0, 4);
		this.proximoCampo(element);

		this.codigoValidacao = this.concatenarCodigoValidacao();
		if (this.codigoValidacao.length == 16) {
			this.captchaElem.execute();
		}
	}

	respostaRecaptcha(respostaRecaptcha: boolean = false) {
		if (respostaRecaptcha) {
			this.pesquisarPorCodigoValidacao();
		}
	}

	pesquisarPorCodigoValidacao() {
		let idCurrent: string;

		if (this.codigoValidacao == null || this.codigoValidacao == '' || this.codigoValidacao.length != 16) {
			return;
		}

		let dql = this.criarDqlBuscarUltimoDocumentoPorId(this.codigoValidacao);
		let url = this.urlDql.concat(dql);

		this.codigoValidacaoService.get(url).subscribe(
			data => {
				this.getData =  data,
				this.idCurrent = this.getData.hasOwnProperty("entries") ? this.getData['entries']['0']['title'] : null,
				this.pesquisarPdf(this.idCurrent)
			},
			error => alert(error), () => console.log("acesso a webapi get ok... pesquisarPdf")
		 );
	}

	pesquisarPdf(idCurrent: string) {
		if (idCurrent === null) {
      this.toastr.info('Documento não encontrado!');
			return;
		}
		let links : Array<string>;
		let url = this.criarUrlContentsContent(idCurrent);

		this.codigoValidacaoService.get(url).subscribe(
			data => {
				this.getData =  data,
				links = this.getData['links'],
        this.pdf = this.getLinkContentMedia(links),
				this.hidePdf = false
			},
			error => alert(error), () => console.log("acesso a webapi get ok... pesquisarPorCodigoValidacao")
		 );
	}

	concatenarCodigoValidacao() {
		let codigoValidacao: string = "";

		for (var i = 1; i < 5; i++) {
			let element = (<HTMLInputElement>document.getElementById("codigoValidacao"+i));
			let valor = element.value;
			if (valor !== null) {
				codigoValidacao += valor;
			} else {
				break;
			}
		}
		return codigoValidacao;
	}

	criarDqlBuscarUltimoDocumentoPorId(rObjectId) {
		return `select d.r_object_id from dm_document d where d.object_name=(select d2.object_name from dm_sysobject d2 where d2.r_object_id='${rObjectId}')`;
	}

	criarUrlContentsContent(r_object_id) {
		let objects: string = "/dctm-rest/repositories/PGE_DEV1/objects/";
		let contentsContent: string = "/contents/content/";
		return objects.concat(r_object_id).concat(contentsContent);
	}

	getLinkContentMedia(links) {
		for (var i = 0; i < links.length; i++) {
			var link = links[i];
			if (link.rel == RelationsDocumentum.CONTENT_MEDIA) {
        document.getElementById('documentoObject')['data']=link.href;
				return link.href;
			}
		}
		return null;
	}

	/**
	 * Altera o foco para o próximo campo.
	 */
	proximoCampo(element: HTMLInputElement) {
		let nextTabIndex = element.tabIndex + 1;
		$('[tabindex=' + nextTabIndex + ']').focus();
	}

	resetVariaveis() {
		this.pdf = "";
		this.hidePdf = true;
		this.idCurrent = null;
	}

	limpar(form: any) {
		form.reset();
    this.resetVariaveis();
    $('[tabindex=' + 1 + ']').focus();
	}

	getLengthCodigoValidacao(): number {
		return this.codigoValidacao != null ? this.codigoValidacao.length : 0;
  }

}
