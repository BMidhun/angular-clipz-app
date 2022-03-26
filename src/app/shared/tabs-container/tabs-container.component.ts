import {
  Component,
  ContentChildren,
  AfterContentInit,
  QueryList,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css'],
})
export class TabsContainerComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> =
    new QueryList();

  constructor() {}

  ngAfterContentInit(): void {
    this.setTabActive(this.tabs.first);
  }

  setTabActive(tab: TabComponent) {
    this.tabs.forEach((item) => (item.isActive = false));
    tab.isActive = true;
  }
}
