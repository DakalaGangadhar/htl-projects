import { AuthorModule } from '../author/author.module';
import { MasterHomeComponent } from '../master/master-home/master-home.component';
import { LoginComponent } from '../reader/login/login.component';
import { ReaderModule } from '../reader/reader.module';
import { RegisterComponent } from '../register/register/register.component';

export const Mainroutes = [
    { path: '', component: MasterHomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reader', loadChildren: () => import('../reader/reader.module').then(m => m.ReaderModule) },
    { path: 'author', loadChildren: () => import('../author/author.module').then(m => m.AuthorModule) },
    { path: 'home', component: MasterHomeComponent },
];

