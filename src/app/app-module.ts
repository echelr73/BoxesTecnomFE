import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AppointmentsList } from './pages/appointments/appointments-list/appointments-list';
import { AppointmentsCreate } from './pages/appointments/appointments-create/appointments-create';
import { Appointments } from './pages/appointments/appointments';
import { AppointmentsModule } from './pages/appointments/appointments-module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppointmentsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
