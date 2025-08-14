import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { DonorListComponent } from './donors/donor-list/donor-list.component';
import { DonorFormComponent } from './donors/donor-form/donor-form.component';
import { DonationListComponent } from './donations/donation-list/donation-list.component';
import { DonationFormComponent } from './donations/donation-form/donation-form.component';
import { CommunicationListComponent } from './communications/communication-list/communication-list.component';
import { CommunicationFormComponent } from './communications/communication-form/communication-form.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    DonorListComponent,
    DonorFormComponent,
    DonationListComponent,
    DonationFormComponent,
    CommunicationListComponent,
    CommunicationFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }