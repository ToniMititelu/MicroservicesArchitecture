import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../../services/shipment.service';
import { Message, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../../models/address.interface';

@Component({
  selector: 'app-create-edit-address',
  templateUrl: './create-edit-address.component.html',
  styleUrls: ['./create-edit-address.component.scss']
})
export class CreateEditAddressComponent implements OnInit {

  addressId: string;

  address: Address = {};

  mandatoryFields = ['country', 'city', 'street', 'number'];

  constructor(readonly shipmentService: ShipmentService,
              readonly messageService: MessageService,
              readonly route: ActivatedRoute,
              readonly router: Router) {
    this.route.paramMap.subscribe(paramMap => {
      this.addressId = paramMap.get('id');
    });
  }

  ngOnInit(): void {
    if (this.addressId) {
      this.shipmentService.getAddress(this.addressId)
        .subscribe((response: Address) => {
          this.address = response;
        });
    }
  }

  submit(event: Event): void {
    const errors: Message[] = [];
    this.mandatoryFields.forEach(field => {
      if (!this.address[field]) {
        errors.push({severity: 'error', summary: 'Field required', detail: `${field} is required`});
      }
    });

    if (errors.length) {
      this.messageService.addAll(errors);
      return;
    }

    (this.addressId ?
      this.shipmentService.editAddress(this.addressId, this.address) : this.shipmentService.createAddress(this.address))
      .subscribe(
        (response) => {
          this.address = response;
          this.messageService.add({
            severity: 'success',
            summary: 'Request succeeded',
            detail: `Address ${this.address.street} saved successfully`
          });
        }, (error) => {
          console.error(error);
        }
      );
  }

  cancel(event: Event): void {
    this.router.navigate(['home']);
  }

  delete(event: Event): void {
    this.shipmentService.deleteAddress(this.addressId)
      .subscribe(
        (response) => {
          this.router.navigate(['home']);
        }, (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Request failed',
            detail: 'Could not delete address, please try again later'
          });
        }
      );
  }

}
