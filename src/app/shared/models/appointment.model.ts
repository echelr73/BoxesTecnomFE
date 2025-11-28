import { Contact } from "./contact.model";
import { Vehicle } from "./vehicle.model";

export interface Appointment {
    place_id: number;
    appointment_at: Date;
    service_type: string;
    contact: Contact;
    vehicle?: Vehicle;
}