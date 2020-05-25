import { NgModule, APP_INITIALIZER } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { FooterComponent } from './components/footer/footer/footer.component';

import { RulesService } from './services/rules.service';

import { PwaService } from './services/pwa.service';

@NgModule({
  declarations: [
    AppComponent,
    ResultadoComponent,
    FooterComponent,
  ],
  imports: [
    SharedModule,
    // Webworker
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    RulesService, PwaService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
