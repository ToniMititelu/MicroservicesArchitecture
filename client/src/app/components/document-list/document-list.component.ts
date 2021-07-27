import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Observable<string[]>;
  currentDoc: string;
  // tslint:disable-next-line:variable-name
  private _docSub: Subscription;

  constructor(private documentService: DocumentService) {
  }

  ngOnInit(): void {
    this.documents = this.documentService.documents;
    this._docSub = this.documentService.currentDocument.subscribe(doc => this.currentDoc = doc.id);
  }

  ngOnDestroy(): void {
    this._docSub.unsubscribe();
  }

  loadDoc(id: string): void {
    this.documentService.getDocument(id);
  }

  newDoc(): void {
    this.documentService.newDocument();
  }
}
