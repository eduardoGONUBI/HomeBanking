import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DepositComponent } from './deposit/deposit.component'; // Import the new components
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ListMovementsComponent } from './list-movements/list-movements.component';
import { RegistrationComponent } from './registration/registration.component'; // Import the new component


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'deposit', component: DepositComponent }, // Define the routes for new components
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'list-movements', component: ListMovementsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent }, // Add the route for registration
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
