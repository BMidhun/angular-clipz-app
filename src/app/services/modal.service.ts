import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: IModal[] = [];

  constructor() {}

  register(id: string) {
    this.modals.push({ visible: false, id });
  }

  unregister(id: string) {
    this.modals = this.modals.filter((ele) => ele.id !== id);
  }

  isModalVisible(id: string) {
    const modal = this.modals.find((element) => element.id === id);

    return Boolean(modal?.visible);
  }

  toggleModal(id: string) {
    // this.modals = this.modals.map((ele) => {
    //   if (ele.id === id) {
    //     ele.visible = !ele.visible;
    //     return ele;
    //   } else return ele;
    // });

    const modal = this.modals.find((element) => element.id === id);

    if (modal) modal.visible = !modal.visible;
  }
}
