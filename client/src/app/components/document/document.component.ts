import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentClass} from '../../models/document.model';
import {Subscription} from "rxjs";
import {DocumentService} from "../../services/document.service";
import {startWith} from "rxjs/operators";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {
  document: DocumentClass;
  // tslint:disable-next-line:variable-name
  private _docSub: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this._docSub = this.documentService.currentDocument.pipe(
      startWith({ id: '', doc: 'Select an existing document or create a new one to get started' })
    ).subscribe(document => this.document = document);
  }

  ngOnDestroy(): void {
    this._docSub.unsubscribe();
  }

  editDoc(): void {
    this.documentService.editDocument(this.document);
  }
}
