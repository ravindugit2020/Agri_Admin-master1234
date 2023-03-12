import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from './chats.component';
import { ChatComponent } from './components/chat/chat.component';
import {
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbFormFieldModule,
  NbInputModule,
  NbLayoutModule, NbThemeModule
} from "@nebular/theme";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ChatsComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbLayoutModule,
    NbChatModule,
    NbFormFieldModule,
    NbThemeModule.forRoot({name: 'default'}),
    FormsModule
  ]
})
export class ChatsModule { }
