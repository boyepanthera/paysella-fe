import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { EstimatesListComponent } from './pages/estimates/estimates-list/estimates-list.component';
import { ViewEstimateComponent } from './pages/estimates/view-estimate/view-estimate.component';
import { NewEstimateComponent } from './pages/estimates/new-estimate/new-estimate.component';
import { EstimatePreviewComponent } from './pages/estimates/estimate-preview/estimate-preview.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full', // Add this to prevent default route interference
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignupComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  // Keep estimates routes flat for now
  {
    path: 'estimates',
    component: EstimatesListComponent,
  },
  {
    path: 'estimates/new',
    component: NewEstimateComponent,
  },
  {
    path: 'estimates/preview',
    component: EstimatePreviewComponent,
  },
  {
    path: 'estimates/:id',
    component: ViewEstimateComponent,
  },
  {
    path: 'estimates/:id/edit',
    component: NewEstimateComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
