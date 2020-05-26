import { Component, OnInit } from "@angular/core";
// import {UploadServiceService} from '../uploadserice/upload-service.service';
import * as _ from 'lodash';
// import {Upload} from '../uploadserice/upload';
@Component({
  selector: "app-upload-adhar",
  templateUrl: "./upload-adhar.component.html",
  styleUrls: ["./upload-adhar.component.scss"],
})
export class UploadAdharComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {}

  // tslint:disable-next-line: member-ordering
  isHovering: boolean;

  // tslint:disable-next-line: member-ordering
  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(file: FileList) {
    console.log(file);
    for (let i = 0; i < file.length; i++) {
      this.files.push(file.item(i));
      // files.stopPropagation();
    }
  }
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
}
}
