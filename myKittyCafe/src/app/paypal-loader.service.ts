import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PayPalLoaderService {
  loadPayPalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById('paypal-sdk')) {
        resolve(); // Script already loaded
        return;
      }

      const script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src = environment.paypalSdkUrl;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.head.appendChild(script);
    });
  }
}
