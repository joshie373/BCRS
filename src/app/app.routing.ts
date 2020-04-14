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
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { RoleGuard } from './shared/guards/role.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
        path: 'users',
        component: UserListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'users/:userId',
        component: UserDetailsComponent,
        canActivate: [SessionGuard]
      },
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionDetailComponent,
        canActivate: [SessionGuard]
      },
      {
        path: 'security-questions/create/new',
        component: SecurityQuestionCreateComponent,
        canActivate:[SessionGuard]
      },
      {
        path: 'profile/:userId',
        component: UserProfileComponent,
        canActivate:[SessionGuard]
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
