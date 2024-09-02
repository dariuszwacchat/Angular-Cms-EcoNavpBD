import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(
    private snackBar: MatSnackBar
  ) { }


  setSnackBar(text: string): void {
    this.snackBar.open(text, '', {
      duration: 15000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
