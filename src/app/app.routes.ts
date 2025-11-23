import { Routes } from "@angular/router";
import { LoginComponent } from "./core/Auth/components/login/login.component";
import { LandingPageComponent } from "./features/landing-page/landing-page.component";
import { AppointmentComponent } from "./features/patient/components/appointment/appointment.component";
import { BookAppointmentComponent } from "./features/patient/components/book-appointment/book-appointment.component";
import { FindHospitalsComponent } from "./features/patient/components/find-hospitals/find-hospitals.component";
import { MedicalRecordsComponent } from "./features/patient/components/medical-records/medical-records.component";
import { MyAppointmentsComponent } from "./features/patient/components/my-appointments/my-appointments.component";
import { MyProfileComponent } from "./features/patient/components/my-profile/my-profile.component";
import { NotificationsComponent } from "./features/patient/components/notifications/notifications.component";
import { PatientComponent } from "./features/patient/components/patient/patient.component";
import { InventoryComponent } from "./features/Pharmacy/components/inventory/inventory.component";
import { NotificationComponent } from "./features/Pharmacy/components/notifications/notifications.component";
import { PatientLookupComponent } from "./features/Pharmacy/components/patient-lookup/patient-lookup.component";
import { PharmacyComponent } from "./features/Pharmacy/components/pharmacy/pharmacy.component";
import { PrescriptionsComponent } from "./features/Pharmacy/components/prescriptions/prescriptions.component";
import { ReportsComponent } from "./features/Pharmacy/components/reports/reports.component";
import { SettingsComponent } from "./features/Pharmacy/components/settings/settings.component";
import { DoctorComponent } from "./features/doctor/components/doctor/doctor.component";
import { DocMyappointmentComponent } from "./features/doctor/components/doc-myappointment/doc-myappointment.component";
import { RegisterComponent } from "./core/Auth/components/register/register.component";
import { UpdateStockComponent } from './features/Pharmacy/components/update-stock/update-stock.component';
import { AddItemComponent } from './features/Pharmacy/components/add-item/add-item.component';
import { DocPatientComponent } from './features/doctor/components/doc-patient/doc-patient.component';
import { DocProfileComponent } from "./features/doctor/components/doc-profile/doc-profile.component";
import { DoctorMedicalRecordsComponent } from "./features/doctor/components/doctor-medical-records/doctor-medical-records.component";
export const routes: Routes = [

  {
    path:'',
    redirectTo:'land',
    pathMatch:'full'
  },
  {
    path: 'land',
    component: LandingPageComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component:RegisterComponent
  },

  {path:'doctor',component:DoctorComponent,
    children:[
      {path:'Appointments',component:DocMyappointmentComponent},
      {path:'Medical-Records',component:DoctorMedicalRecordsComponent},
      {path:'Patients',component:DocPatientComponent},
      {path:'My-Profile',component:DocProfileComponent},
      {path:'',redirectTo:'Appointments', pathMatch:'full'}
    ]
  },

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
      { path: 'appointment/:id', component: AppointmentComponent },
      { path: '', redirectTo: 'my-appointments', pathMatch: 'full' },
    ],
  },

  {
    path: 'pharmacy',
    component: PharmacyComponent,
    children: [
      { path: 'reports', component: ReportsComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'prescriptions', component: PrescriptionsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'notifications', component: NotificationComponent },
      { path: 'patient-lookup', component: PatientLookupComponent },
      { path: '', redirectTo: 'reports', pathMatch: 'full' },
      { path: 'update-stock', component: UpdateStockComponent },
      { path: 'add-item', component: AddItemComponent }
    ],
  },
];
