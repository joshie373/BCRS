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
  MatTabsModule
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
    UserRegistrationDialogComponent
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
    MatTabsModule
  ],
  providers: [
    SessionGuard,
    CookieService,
    SessionService
  ],
  entryComponents: [
    SecurityQuestionDeleteDialogComponent,
    UserDeleteDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
