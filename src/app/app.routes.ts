import { Routes } from '@angular/router';
import { PatientComponent } from './features/patient/components/patient/patient.component';
import { BookAppointmentComponent } from './features/patient/components/book-appointment/book-appointment.component';
import { FindHospitalsComponent } from './features/patient/components/find-hospitals/find-hospitals.component';
import { MedicalRecordsComponent } from './features/patient/components/medical-records/medical-records.component';
import { MyAppointmentsComponent } from './features/patient/components/my-appointments/my-appointments.component';
import { MyProfileComponent } from './features/patient/components/my-profile/my-profile.component';
import { NotificationsComponent } from './features/patient/components/notifications/notifications.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { LoginComponent } from './core/Auth/components/login/login.component';
import { RegisterComponent } from './core/Auth/components/register/register.component';



export const routes: Routes = [
    {path:'',
        component:LandingPageComponent
    },


    {
        path: 'patient',
        component: PatientComponent,
        children: [
            { path: 'my-appointments', component: MyAppointmentsComponent },
            // { path: 'book-appointment', component: BookAppointmentComponent },
            // { path: 'medical-records', component: MedicalRecordsComponent },
            // { path: 'find-hospitals', component: FindHospitalsComponent },
            // { path: 'notifications', component: NotificationsComponent },
            // { path: 'my-profile', component: MyProfileComponent },
            { path: '', redirectTo: 'my-appointments', pathMatch: 'full' },
          
        ]
        
    }
];
