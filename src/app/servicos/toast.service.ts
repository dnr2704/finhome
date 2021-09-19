import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) {}

  async showToast(msg: string, duracao: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracao
    });
    toast.present();
  }

}
