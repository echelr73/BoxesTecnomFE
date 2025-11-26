import { Contact } from "./contact.model";
import { Vehicle } from "./vehicle.model";

export interface Appointment {
    place_Id: number;
    appointment_At: Date;
    service_Type: string;
    contact: Contact;
    vehicle?: Vehicle;
}