import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { Efactura3FeSharedModule, UserRouteAccessService } from './shared';
import { Efactura3FeAppRoutingModule} from './app-routing.module';
import { Efactura3FeHomeModule } from './home/home.module';
import { Efactura3FeAdminModule } from './admin/admin.module';
import { Efactura3FeEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { StateStorageService } from './shared/auth/state-storage.service';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        Efactura3FeAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        Efactura3FeSharedModule,
        Efactura3FeHomeModule,
        Efactura3FeAdminModule,
        Efactura3FeEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                StateStorageService,
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class Efactura3FeAppModule {}
