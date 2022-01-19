
import { AuthGuard } from './guards/auth.guard';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: '',
    component : HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate:[AuthGuard],
    runGuardsAndResolvers: 'always',
    children:[
      {
        path: 'members',
        loadChildren: () => import('./modules/members.module').then(m=>m.MembersModule)
      },
      {path :'members',component: MemberListComponent},
      {path:'members/:id',component: MemberDetailComponent },
      {path: 'lists',component: ListsComponent},
      {path: 'messages',component: MessagesComponent},
      {
        path:'**', //localhost:4200/non-existing-route/vcxndf/fdshj =>error page
        pathMatch:'full',
        component: HomeComponent,

      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //localhost:4200/
  exports: [RouterModule]
})
export class AppRoutingModule { }
