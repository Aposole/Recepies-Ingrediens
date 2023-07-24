import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.css'],
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost:PlaceholderDirective//get help to acces the Directive
  
  private closeSub:Subscription;
  
  constructor(
    private authService: AuthService, 
    private router: Router,
    private componentFactoryResolver:ComponentFactoryResolver) {}

  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe()
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs!: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        //this.error = errorMessage;
        this.showErrorAlert(errorMessage)
        this.isLoading = false;
      }
    );

    form.reset();

    
  }

  onHandaleError(){
    this.error = null
  }

  private showErrorAlert(message:string){
    //const alertCmp = new AlertCompoenent //this is not what angular needs for it to work
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    //this is now an object that knows how to create alert compoennt
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)//store it in const to interact with it here
    componentRef.instance.message = message//instance gives acces to the concrite instance of the component that was created
    this.closeSub = componentRef.instance.close.subscribe(
      ()=>{
        this.closeSub.unsubscribe()
        hostViewContainerRef.clear()
      }
    )
  
  }//in this we made the alert component dynamic
}
