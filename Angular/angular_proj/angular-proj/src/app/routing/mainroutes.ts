import { CustomerModule } from '../customer.module';
import { LoginComponent } from '../login/login/login.component';
import { HomeComponent } from '../master/home/home.component';
import { RegisterComponent } from '../register/register/register.component';

export const Mainroutes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'customer', loadChildren: () => import('../customer.module').then(m => m.CustomerModule) },
    { path: 'supplier', loadChildren: () => import('../supplier/supplier.module').then(m => m.SupplierModule) },
    { path: 'home', component: HomeComponent },
];
