// map-point-modal.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-map-point-modal',
  templateUrl: './map-point-modal.component.html',
  styleUrls: ['./map-point-modal.component.css']
})
export class MapPointModalComponent {
  pointForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MapPointModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lat: number, lng: number }
  ) {
    this.pointForm = this.fb.group({
      description: ['', Validators.required],
      latitude: [{ value: data.lat, disabled: true }, Validators.required],
      longitude: [{ value: data.lng, disabled: true }, Validators.required]
    });
  }

  save() {
    if (this.pointForm.valid) {
      const formValues = this.pointForm.getRawValue();
      formValues.latitude = this.data.lat;
      formValues.longitude = this.data.lng;
      this.dialogRef.close(formValues);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
