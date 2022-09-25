import { HomeRouting } from "./home.routing";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./home.component";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRouting, HttpClientModule],
})
export class HomeModule {}
