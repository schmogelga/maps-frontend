import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecretComponent } from './secret/secret.component';
import { TokenInterceptor } from './helpers/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomePageComponent } from './home-page/home-page.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MapComponent } from './map/map.component';
import { MapPointModalComponent } from './map-point-modal/map-point-modal.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EventCardComponent } from './event-card/event-card.component';

@NgModule({
  declarations: [AppComponent, SecretComponent, LoginPageComponent, RegisterPageComponent, HomePageComponent, MapComponent, MapPointModalComponent, AdminPanelComponent, EventCardComponent],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    AppRoutingModule,
    LeafletModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
