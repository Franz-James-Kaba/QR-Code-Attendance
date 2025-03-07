import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardConfig, DynamicCardComponent } from '@shared/components/card/card.component';
import { DialogService } from '@core/services/dialog.service';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, DynamicCardComponent, ButtonComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  nspCardConfig: CardConfig = {
    type: 'analytics',
    count: 112,
    subtitle: 'Total number of NSPs',
    icon: '👤',
    detailsLink: '/nsps'
  };

  facilitatorCardConfig: CardConfig = {
    type: 'analytics',
    count: 16,
    subtitle: 'Total number of Facilitators',
    icon: '👤',
    detailsLink: '/facilitators'
  };

  private readonly dialogService = inject(DialogService);

  constructor() {}

  showDetails(type: string): void {
    console.log(`Show details for ${type}`);
    // Navigate to details page or show more information
  }

  openAnalyticsModal(): void {
    console.log('Opening analytics modal');
    const componentRef = this.dialogService.open(DynamicCardComponent, {
      config: this.nspCardConfig,
      isModal: true
    });
    console.log('Analytics modal component reference created:', componentRef);

    componentRef.instance.closeModal.subscribe(() => {
      console.log('Close modal event received');
      this.dialogService.close();
    });
  }

  showAddModal() {
    return 'Open add NSP modal';
  }
}
