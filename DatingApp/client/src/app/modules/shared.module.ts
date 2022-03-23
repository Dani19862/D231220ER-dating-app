import { RouterModule } from '@angular/router';
import { MemberCardComponent } from './../members/member-card/member-card.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  imports: [
    NgxGalleryModule,
    CommonModule,
    RouterModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot()



  ],
  declarations: [
    MemberCardComponent
  ],
  exports:[

    ButtonsModule,
    NgxSpinnerModule,
    NgxGalleryModule,
    TabsModule,
    BsDropdownModule,
    ToastrModule,
    FileUploadModule,
    BsDatepickerModule,
    FormsModule,
    PaginationModule,
    TimeagoModule,
    MemberCardComponent
  ]
})
export class SharedModule { }
