import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'booking',
    loadChildren: () => import('./pages/booking/booking.module').then( m => m.BookingPageModule)
  },
  {
    path: 'viewall',
    loadChildren: () => import('./pages/viewall/viewall.module').then( m => m.ViewallPageModule)
  },
  {
    path: 'appt-info',
    loadChildren: () => import('./pages/appt-info/appt-info.module').then( m => m.ApptInfoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'appt-summary',
    loadChildren: () => import('./pages/appt-summary/appt-summary.module').then( m => m.ApptSummaryPageModule)
  },
  {
    path: 'admin-board',
    loadChildren: () => import('./pages/admin-board/admin-board.module').then( m => m.AdminBoardPageModule)
  },
  {
    path: 'limit-appointment',
    loadChildren: () => import('./pages/limit-appointment/limit-appointment.module').then( m => m.LimitAppointmentPageModule)
  },
  {
    path: 'refund-policy',
    loadChildren: () => import('./pages/refund-policy/refund-policy.module').then( m => m.RefundPolicyPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
