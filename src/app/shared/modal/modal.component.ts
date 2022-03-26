import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() modalId = '';

  constructor(
    public modalService: ModalService,
    public elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    document.body.appendChild(this.elementRef.nativeElement);
  }

  checkModalVisibility() {
    return this.modalService.isModalVisible(this.modalId);
  }

  closeModal() {
    this.modalService.toggleModal(this.modalId);
  }
}
