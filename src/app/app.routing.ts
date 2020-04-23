import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { SessionGuard } from './shared/guards/session.guard';
import { UserListComponent } from './pages/user-list/user-list.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SecurityQuestionDetailComponent } from './pages/security-question-detail/security-question-detail.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AboutComponent } from './pages/about/about.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { RoleGuard } from './shared/guards/role.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactComponent } from './pages/contact/contact.component';
import { VerifySecurityQuestionsComponent } from './shared/verify-security-questions/verify-security-questions.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';
import { ServiceRepairComponent } from './pages/service-repair/service-repair.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleDetailComponent } from './pages/role-detail/role-detail.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { ServiceCreateComponent } from './pages/service-create/service-create.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { PurchasesByServiceComponent } from './pages/purchases-by-service/purchases-by-service.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [SessionGuard]
      },
      {
        path: 'services-repair',
        component: ServiceRepairComponent,
        canActivate: [SessionGuard]
      },
      {
        path: 'about',
        component: AboutComponent,
        canActivate: [SessionGuard]
      },
      {
        path: 'contact',
        component: ContactComponent,
        canActivate: [SessionGuard]
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'users/:userId',
        component: UserDetailsComponent,
        canActivate: [SessionGuard]
      },

      //security question routes
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionDetailComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-questions/create/new',
        component: SecurityQuestionCreateComponent,
        canActivate:[RoleGuard]
      },

      //role routes
      {
        path: 'roles/create/new',
        component: RoleCreateComponent,
        canActivate:[RoleGuard]
      },
      {
        path: 'roles',
        component: RoleListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'roles/:roleId',
        component: RoleDetailComponent,
        canActivate: [RoleGuard]
      },

      //service routes
      {
        path: 'services/create/new',
        component: ServiceCreateComponent,
        canActivate:[RoleGuard]
      },
      {
        path: 'services',
        component: ServiceListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'services/:serviceId',
        component: ServiceDetailComponent,
        canActivate: [RoleGuard]
      },

      //profile route
      {
        path: 'profile/:userId',
        component: UserProfileComponent,
        canActivate:[SessionGuard]
      },

      //purchases graph
      {
        path: 'purchases-graph',
        component: PurchasesByServiceComponent,
        canActivate:[RoleGuard]
      }
    ]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'users/:username/verify-security-questions',
        component: VerifySecurityQuestionsComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: '500',
        component: ServerErrorComponent
      },
      {
        path: '404',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/404'
  }
];
