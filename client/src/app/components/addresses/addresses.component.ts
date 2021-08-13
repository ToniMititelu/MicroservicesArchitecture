import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ShipmentService } from '../../services/shipment.service';
import { Address } from '../../models/address.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

  addresses: Address[] = [];

  constructor(readonly shipmentService: ShipmentService,
              readonly messageService: MessageService,
              readonly confirmationService: ConfirmationService,
              readonly route: ActivatedRoute,
              readonly router: Router) {
  }

  ngOnInit(): void {
    this.shipmentService.getMyAddresses()
      .subscribe((response: Address[]) => {
        this.addresses = response;
      }, (error: HttpErrorResponse) => {
        console.error(error);
      });
  }

  addNewAddress(): void {
    this.router.navigate(['addresses/create']);
  }

  editAddress(addressId: string): void {
    this.router.navigate(['addresses', addressId, 'update']);
  }

  deleteAddress(addressId: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this address?',
      accept: () => {
        this.shipmentService.deleteAddress(addressId)
          .subscribe((response) => {
            this.addresses = this.addresses.filter(address => address._id !== addressId);
          }, error => console.error(error));
      }
    });
  }

}
