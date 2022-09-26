import { HomeRouting } from "./home.routing";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./home.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRouting,
    HttpClientModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    CollapseModule,
  ],
})
export class HomeModule {}
