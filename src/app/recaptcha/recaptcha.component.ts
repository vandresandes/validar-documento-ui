import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvisibleReCaptchaComponent } from 'ngx-captcha';
import { RecaptchaService } from '../service/recaptcha.service';

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.scss']
})
export class RecaptchaComponent implements OnInit {
  protected aFormGroup: FormGroup;
  private siteKey = "6LeIyX4UAAAAAHAkbuLXCL85ImkttYoy9ZMALXT5"; // Google reCAPTCHA2
  private lang = "pt-BR";
  private checked: boolean = false;

  @ViewChild('captchaElemInterno') captchaElem: InvisibleReCaptchaComponent;
  @Output() respostaRecaptcha = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private recaptchaService: RecaptchaService) { }

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  handleSuccess(event) {
    this.post(event);
  }

  handleReset() {
  }

  handleReady() {
  }

  handleExpire() {
  }

  /**
   * Opcional. O nome da sua função de retorno de chamada a ser executada assim que todas as dependências forem carregadas.
   */
  handleLoad() {
  }

  handleReload() {
  }

  /**
   * Invocar programaticamente a verificação reCAPTCHA. Usado se o reCAPTCHA invisível estiver em um div em vez de um botão.
   */
  execute() {
    if (!this.checked) {
      this.captchaElem.execute();
    } else {
      this.respostaRecaptcha.emit(true);
    }
  }

  post(response: string) {
    this.recaptchaService.post(response).subscribe(
      data => {
        console.log(data),
        this.checked = true,
        this.respostaRecaptcha.emit(data['success'])
      },
      error => {console.log("error acesso a webapi post..."), console.log(error)}, () => console.log("acesso a webapi post ok...")
      );
    }
}
