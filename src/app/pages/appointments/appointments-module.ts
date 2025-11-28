import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing-module';
import { Appointments } from './appointments';
import { AppointmentsList } from './appointments-list/appointments-list';
import { AppointmentsCreate } from './appointments-create/appointments-create';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelect } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    Appointments,
    AppointmentsList,
    AppointmentsCreate
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelect,
    MatOption,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule
],
  exports: [
    AppointmentsList,
    AppointmentsCreate
  ]
})
export class AppointmentsModule { }
