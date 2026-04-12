import { Component } from '@angular/core';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-home',
  imports: [SafeUrlPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  reelUrl = "https://www.youtube.com/embed/J4taJk9VpPE";
}
