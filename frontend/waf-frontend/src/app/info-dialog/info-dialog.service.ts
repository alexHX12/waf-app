import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InfoDialogComponent } from './info-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {

  constructor(private modalService: NgbModal) { }

  public open(title: string,message: string): Promise<boolean> {
    const modalRef = this.modalService.open(InfoDialogComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    return modalRef.result;
  }

  public openDefaultSuccess(){
    this.open("Conferma operazione","Operazione eseguita correttamente!");
  }

  public openDefaultError(){
    this.open("Errore","L'operazione è terminata a causa di un errore imprevisto!");
  }

}