import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  alert;
  constructor(private alertController: AlertController) { }

  async confirmacao(_header: any, _message: any, cancelaTexto: any, okTexto: any): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: _header,
        message: _message,
        buttons: [
          {
            text: cancelaTexto,
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              resolve('cancel');
            }
          }, {
            text: okTexto,
            handler: (ok) => {
              resolve('ok');
            }
          }
        ]
      });
      alert.present();
    });
  }
}
