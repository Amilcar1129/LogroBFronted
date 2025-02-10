import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {  HttpClient,HttpClientModule } from '@angular/common/http';
import { CitasMedicasService } from './services/citas-medicas.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet,HttpClientModule],
  providers: [CitasMedicasService]
})
export class AppComponent {
  constructor() {}
}
