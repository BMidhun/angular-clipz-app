import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../user/auth-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    public modalService: ModalService,
    public authService: AuthService,
    private firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  async logout(event: Event) {
    event.preventDefault();
    await this.firebaseAuth.signOut();
  }
}
