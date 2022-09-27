import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { i18nMetaToJSDoc } from "@angular/compiler/src/render3/view/i18n/meta";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  readonly apiURL: string;
  isCollapsed = true;
  title: string;
  content: string;
  id: number;
  notes: any;
  filteredNotes: Array<any>;
  isSortedByAsc = false;


  constructor(private http: HttpClient) {
    this.apiURL = "https://6078ed5ae7f4f50017184e92.mockapi.io/api/v1/todo";
  }

  ngOnInit() {
    this.getAllNotes();
  }

  getAllNotes() {
    this.http.get(`${this.apiURL}`).subscribe((resultado) => {
      this.notes = resultado;
      this.filteredNotes = this.notes;
    });
  }

  /*   getNote(id: number) {
    this.http
      .get(`${this.apiURL}/${id}`)
      .subscribe((resultado) => console.log(resultado));
  } */

  editNote(note: any) {
    this.title = note.title;
    this.content = note.content;
    this.id = note.id;
    this.isCollapsed = false;
  }

  addNote() {
    if (!this.id) {
      this.http
        .post(`${this.apiURL}`, {
          title: this.title,
          content: this.content,
        })
        .subscribe(() => {
          this.isCollapsed = true;
          this.getAllNotes();
        });
    } else {
      this.editNoteRequest(this.id, this.title, this.content);
      this.isCollapsed = true;
    }
    this.getAllNotes();
  }

  editNoteRequest(id: number, title: string, content: string) {
    this.http
      .put(`${this.apiURL}/${id}`, {
        title: title,
        content: content,
      })
      .subscribe(() => this.getAllNotes());
  }

  deleteNote(note: any) {
    this.http
      .delete(`${this.apiURL}/${note.id}`)
      .subscribe(() => this.getAllNotes());
  }

  onAddNote() {
    this.id = null;
    this.title = "";
    this.content = "";
    this.isCollapsed = !this.isCollapsed;
  }

  filter(query: string) {
    query = query.toLowerCase().trim();
    let terms: string[] = query.split(" ");
    terms = this.removeDuplicatesResults(terms);
    terms.forEach((term) => {
      let results: Array<any> = this.relevanteNotes(term);
      let uniqueResults = this.removeDuplicatesResults(results);
      this.filteredNotes = uniqueResults;
    });
  }

  removeDuplicatesResults(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();

    arr.forEach((e) => uniqueResults.add(e));
    return Array.from(uniqueResults);
  }

  relevanteNotes(query: string): Array<any> {
    query.toLowerCase().trim();
    let relevanteNotes = this.notes.filter((note) => {
      if (note.content && note.content.toLowerCase().includes(query)) {
        return true;
      }
      if (note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    });
    return relevanteNotes;
  }

  sortResultsByTitle() {
    if (!this.isSortedByAsc) {
      this.filteredNotes.sort(function (a, b) {
        return a.title < b.title ? -1 : a.nome > b.nome ? 1 : 0;
      });
      this.isSortedByAsc = true;
    } else {
      this.filteredNotes.sort(function (a, b) {
        return a.title > b.title ? -1 : a.nome < b.nome ? 1 : 0;
      });
      this.isSortedByAsc = false;
    }
  }
}
