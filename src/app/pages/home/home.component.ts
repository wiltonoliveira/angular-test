import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  readonly apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = "https://6078ed5ae7f4f50017184e92.mockapi.io/api/v1/todo";
  }

  getAllNotes() {
    this.http
      .get(`${this.apiURL}`)
      .subscribe((resultado) => console.log(resultado));
  }

  addNote() {
    console.log('vai rolar po confia');
  }
}
