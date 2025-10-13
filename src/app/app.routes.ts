import { Routes } from '@angular/router';
import { PatientComponent } from './patient/patient/patient.component';
import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
import { FindHospitalsComponent } from './patient/find-hospitals/find-hospitals.component';
import { MedicalRecordsComponent } from './patient/medical-records/medical-records.component';
import { MyAppointmentsComponent } from './patient/my-appointments/my-appointments.component';
import { MyProfileComponent } from './patient/my-profile/my-profile.component';
import { NotificationsComponent } from './patient/notifications/notifications.component';

export const routes: Routes = [
    {
        path: 'patient',
        component: PatientComponent,
        children: [
            { path: 'my-appointments', component: MyAppointmentsComponent },
            { path: 'book-appointment', component: BookAppointmentComponent },
            { path: 'medical-records', component: MedicalRecordsComponent },
            { path: 'find-hospitals', component: FindHospitalsComponent },
            { path: 'notifications', component: NotificationsComponent },
            { path: 'my-profile', component: MyProfileComponent },
            { path: '', redirectTo: 'my-appointments', pathMatch: 'full' }
        ]
    }
];
