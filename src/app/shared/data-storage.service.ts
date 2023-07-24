import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http:HttpClient,
    private recipeService:RecipeService,
    private authService:AuthService
    ) {}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes()//storing recipes in varuable
    this.http.put('https://courseproject-4eb37-default-rtdb.firebaseio.com/recipes.json',
    recipes
    )
    .subscribe(response=>{
      console.log(response)
    })

  }

  fetchRecipes(){
    //pipe(take(1)) takes 1 user and then unsubscribe
    //exhaustMap replaces all the previeus observable

    
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap(user=>{    //got one user unsubscribe than replaced it with a new observable
        
  return this.http
    .get<Recipe[]>(
      'https://courseproject-4eb37-default-rtdb.firebaseio.com/recipes.json',
      // {
      //   params: new HttpParams().set('auth',user.token)
      // }
            //this is how to add the token for the user we extracted and add it to the request above
            //we dose this by adding it as query parameters in the url above
            //for other api you add it as a header
            //for time data base you add it as a token(firebase docs)
      ).pipe(
        map(recipes=>{
          return recipes.map(recipe =>{
            return{
              ...recipe,
               ingredients :recipe.ingredients ? recipe.ingredients : []
            }
          })
        }),
        tap(recipes =>{
          this.recipeService.setRecipes(recipes)
        }))
  }
}
