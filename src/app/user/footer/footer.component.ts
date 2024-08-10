import { Component } from '@angular/core';
import { faFacebook, faGoogle, faTelegram, faTelegramPlane, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { faLocation, faPhone } from '@fortawesome/free-solid-svg-icons';
faTelegram
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {


  facebookIc = faFacebook;
  twitterIC = faTwitter;
  googleIc = faGoogle;
  telegramPlaneIc = faTelegram;
  envelopeIc = faEnvelopeOpen;
  phoneIc = faPhone;
  mapMarkIc = faLocation;
}
