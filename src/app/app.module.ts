import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RulesService } from './services/rules.service';
import { ResultadoComponent } from './components/resultado/resultado.component';

import { MatFormFieldModule } from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HoursPipe } from './pipes/hours.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FooterComponent } from './components/footer/footer/footer.component';
@NgModule({
  declarations: [AppComponent, ResultadoComponent, HoursPipe, FooterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    // Material Modules
    MatButtonToggleModule,
    MatSelectModule, MatInputModule,
    MatFormFieldModule, MatToolbarModule,
    MatCardModule, MatSnackBarModule,

    // Webworker
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  providers: [RulesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
