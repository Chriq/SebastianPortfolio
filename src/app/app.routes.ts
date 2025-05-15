import { Routes } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { ContactComponent } from './views/contact/contact.component';
import { PortfolioComponent } from './views/portfolio/portfolio.component';
import { ProjectViewComponent } from './views/project-view/project-view.component';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: "home", pathMatch: "full"},
    {path: 'home', component: HomeComponent},
    {path: 'portfolio', component: PortfolioComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},

    {path: 'portfolio/:name', component: ProjectViewComponent},

    //{ path: '**', component: PageNotFoundComponent }
];
