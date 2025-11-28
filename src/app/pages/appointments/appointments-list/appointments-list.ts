import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Workshop } from '../../../shared/models/workshop.model';
import { WorkshopsService } from '../../../services/workshopsService';
import { Appointment } from '../../../shared/models/appointment.model';
import { AppointmentsService } from '../../../services/appointmentsService';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentsCreate } from '../appointments-create/appointments-create';

@Component({
  selector: 'app-appointments-list',
  standalone: false,
  templateUrl: './appointments-list.html',
  styleUrl: './appointments-list.scss',
})
export class AppointmentsList implements OnInit {
  appointments: Appointment[] = [];
  workshops: Workshop[] = [];

  constructor(
    private appointmentsService: AppointmentsService,
    private workshopsService: WorkshopsService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadAppointments();
    this.loadWorkshops();
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(AppointmentsCreate, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'created') {
        this.loadAppointments(); // refresca la lista
      }
    });
  }

  private loadAppointments() {
    this.appointmentsService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data.sort((a, b) => 
          new Date(a.appointment_at).getTime() - new Date(b.appointment_at).getTime()
        );
        this.cd.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  private loadWorkshops() {
    this.workshopsService.getWorkshops().subscribe({
      next: (data) => {
        this.workshops = data;
        this.cd.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  getWorkshop(placeId: number): Workshop | undefined {
    return this.workshops.find(w => w.id === placeId);
  }

  getWorkshopTooltip(placeId: number): string {
    const workshop = this.getWorkshop(placeId);
    if (!workshop || (!workshop.phone && !workshop.email) ) return 'No workshop information available';
  
    const parts: string[] = [];
  
    if (workshop.phone) parts.push(`Phone: ${workshop.phone}`);
    if (workshop.email) parts.push(`Email: ${workshop.email}`);
  
    return parts.join(' | ');
  }
  
}
