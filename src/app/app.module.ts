import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppRoutes } from './app.routing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatCardModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatDialogModule,
  MatStepperModule,
  MatSnackBarModule,
  MatChipsModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatDividerModule,
  MatCheckboxModule
} from '@angular/material';

import {MatTableModule} from '@angular/material/table';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { SecurityQuestionDetailComponent } from './pages/security-question-detail/security-question-detail.component';
import { SessionGuard } from './shared/guards/session.guard';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from './shared/services/session.service';
import { UserDeleteDialogComponent } from './dialogs/user-delete-dialog/user-delete-dialog.component';
import { SecurityQuestionDeleteDialogComponent } from './dialogs/security-question-delete-dialog/security-question-delete-dialog.component';
import { UserRegistrationDialogComponent } from './dialogs/user-registration-dialog/user-registration-dialog.component';
import { RoleGuard } from './shared/guards/role.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutComponent } from './pages/about/about.component';
import { ForgotPasswordDialogComponent } from './dialogs/forgot-password-dialog/forgot-password-dialog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { VerifySecurityQuestionsComponent } from './shared/verify-security-questions/verify-security-questions.component';
import {MatListModule} from '@angular/material/list';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';
import { InvoiceSummaryDialogComponent } from './dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import { ServiceRepairComponent } from './pages/service-repair/service-repair.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleDeleteDialogComponent } from './dialogs/role-delete-dialog/role-delete-dialog.component';
import { RoleDetailComponent } from './pages/role-detail/role-detail.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { ServiceCreateComponent } from './pages/service-create/service-create.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { ServiceDeleteDialogComponent } from './dialogs/service-delete-dialog/service-delete-dialog.component';
import { PurchasesByServiceComponent } from './pages/purchases-by-service/purchases-by-service.component';
import { ChartModule } from 'primeng/chart';
import { InvoicesListComponent } from './pages/invoices-list/invoices-list.component';
import { UserInvoicesComponent } from './pages/user-invoices/user-invoices.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    SigninComponent,
    SecurityQuestionListComponent,
    SecurityQuestionCreateComponent,
    SecurityQuestionDetailComponent,
    UserListComponent,
    UserDetailsComponent,
    UserDeleteDialogComponent,
    SecurityQuestionDeleteDialogComponent,
    UserRegistrationDialogComponent,
    UserProfileComponent,
    ServerErrorComponent,
    NotFoundComponent,
    AboutComponent,
    ForgotPasswordDialogComponent,
    ContactComponent,
    VerifySecurityQuestionsComponent,
    ResetPasswordComponent,
    InvoiceSummaryDialogComponent,
    ServiceRepairComponent,
    RoleListComponent,
    RoleDeleteDialogComponent,
    RoleDetailComponent,
    RoleCreateComponent,
    ServiceCreateComponent,
    ServiceListComponent,
    ServiceDetailComponent,
    ServiceDeleteDialogComponent,
    PurchasesByServiceComponent,
    InvoicesListComponent,
    UserInvoicesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled'
    }),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatStepperModule,
    MatSnackBarModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule, 
    MatCheckboxModule,
    ChartModule,
    MatSelectModule
  ],
  providers: [
    SessionGuard,
    CookieService,
    SessionService,
    RoleGuard
  ],
  entryComponents: [
    SecurityQuestionDeleteDialogComponent,
    UserDeleteDialogComponent,
    RoleDeleteDialogComponent,
    UserRegistrationDialogComponent,
    ForgotPasswordDialogComponent, 
    InvoiceSummaryDialogComponent,
    ServiceDeleteDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
