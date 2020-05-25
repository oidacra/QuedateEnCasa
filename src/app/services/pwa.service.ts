import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class PwaService {
  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {}
  public check() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        const snackBarRef = this.snackbar.open(
          'Existe una nueva versión del la aplicación',
          'Descargando...',
          {
            duration: 4000,
          }
        );
        snackBarRef.afterDismissed().subscribe(() => {
          window.location.reload();
        });
      });
    }
  }
}
