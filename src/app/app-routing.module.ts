import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';



const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  //{ path: 'recipes', loadChildren:('./recipes/recipes.module.ts#RecipesModule') }
  { 
    path: 'recipes', loadChildren:()=>
    import('./recipes/recipes.module')
    .then(m=>m.RecipesModule)},
  { 
    path: 'shopping-list', loadChildren:()=>
    import('./shopping-list/shopping-list.module')
    .then(m=>m.ShoppingListModule)},
  { 
    path: 'auth', loadChildren:()=>
    import('./auth/auth.Module')
    .then(m=>m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
//{ path: 'Supplier', loadChildren: '../Supplier/CustomerApp.SupplierModule#CustomerAppSupplierModule' },
//   change to this:

//{ 
//   path: 'Supplier',
//   loadChildren: () => import('../Supplier/CustomerApp.SupplierModule').then(x => x.CustomerAppSupplierModule)
//},
//version thing