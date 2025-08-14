import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DonorListComponent } from './donors/donor-list/donor-list.component';
import { DonationListComponent } from './donations/donation-list/donation-list.component';
import { CommunicationListComponent } from './communications/communication-list/communication-list.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'donors', component: DonorListComponent, canActivate: [AuthGuard] },
  { path: 'donations', component: DonationListComponent, canActivate: [AuthGuard] },
  { path: 'communications', component: CommunicationListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/donors', pathMatch: 'full' },
  { path: '**', redirectTo: '/donors' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }