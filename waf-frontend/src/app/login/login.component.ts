import { Component, ElementRef, OnInit } from '@angular/core';
import { cilUser,cilFingerprint} from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [IconSetService]
})
export class LoginComponent implements OnInit {

  constructor(private elementRef: ElementRef,public iconSet: IconSetService) {
    iconSet.icons = { cilUser,cilFingerprint};
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.setProperty("background-image","url('../../assets/background.jpg')");
    this.elementRef.nativeElement.ownerDocument.body.style.setProperty("background-position","center");
    this.elementRef.nativeElement.ownerDocument.body.style.setProperty("background-repeat","no-repeat"); 
}
}
