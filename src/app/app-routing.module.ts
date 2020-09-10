import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./components/shared/page404/page404.component";
import { AuthBeforeLoginGuard } from "./core/guards/auth-before-login.guard";
import { AuthAfterLoginGuard } from "./core/guards/auth-after-login.guard";
import { SigninComponent } from "./components/auth/signin/signin.component";
import { PdfTableComponent } from "./components/dashboard/close-report-pdf/pdf-table.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthBeforeLoginGuard],
    children: [
      { path: "", redirectTo: "/" + "signin", pathMatch: "full" },
      { path: "signin", component: SigninComponent },
    ],
  },
  {
    path: "",
    loadChildren: () =>
      import("./components/dashboard/modules/dashboard.module").then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthAfterLoginGuard],
  },
  { path: "close-report/:id", component: PdfTableComponent },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
