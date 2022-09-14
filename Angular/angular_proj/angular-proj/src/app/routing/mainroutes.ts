import { CustomerModule } from '../customer.module';
import { HomeComponent } from '../master/home/home.component';

export const Mainroutes = [
    { path: '', component: HomeComponent },
    { path: 'customer', loadChildren: () => import('../customer.module').then(m => m.CustomerModule) },
    { path: 'supplier', loadChildren: () => import('../supplier/supplier.module').then(m => m.SupplierModule) },
    { path: 'home', component: HomeComponent },
];
