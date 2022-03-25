import { Component, ElementRef, OnInit } from '@angular/core';
import { cilUser,cilFingerprint} from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';
// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [IconSetService]
})
export class LoginComponent implements OnInit {

  constructor(private elementRef: ElementRef,public iconSet: IconSetService,public auth: AuthService) {
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
