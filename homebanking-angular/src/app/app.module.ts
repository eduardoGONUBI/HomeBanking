import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './authi.service';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { AppRoutingModule } from './app-routing.module';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { JwtService } from './jwt-service.service';
import { ListMovementsComponent } from './list-movements/list-movements.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { MovementsDialogComponent } from './movements-dialog/movements-dialog.component';
import { RegistrationComponent } from './registration/registration.component';
import { FailureDialogComponent } from './failure-dialog/failure-dialog.component';
import { PassmatchDialogComponent } from './passmatch-dialog/passmatch-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    DepositComponent,
    WithdrawComponent,
    ListMovementsComponent,
    SuccessDialogComponent,
    MovementsDialogComponent,
    RegistrationComponent,
    FailureDialogComponent,
    PassmatchDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
