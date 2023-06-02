import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { appReducer } from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { HeaderComponent } from './header/header.component';
import { LogisticsEffects } from './logistics/store/logistics.effects';
import { TableComponent } from './shared/table/table.component';
import { UserEffects } from './users/store/user.effects';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [AppComponent, HeaderComponent, TableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, LogisticsEffects, UserEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
