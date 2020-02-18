import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatInputModule, MatIconModule, MatBadgeModule, MatSidenavModule, MatListModule, MatGridListModule, MatFormFieldModule, MatSelectModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatTooltipModule, MatTableModule, MatPaginatorModule, MatCardModule} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatBadgeModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
    ],
    exports:[
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatBadgeModule,
        MatListModule,
        MatGridListModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatChipsModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
    ],
    providers: [
       MatDatepickerModule,
    ]
})
export class MaterialModule {}