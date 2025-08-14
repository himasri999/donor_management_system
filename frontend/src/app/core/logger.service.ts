import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: string, data?: any) {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`, data);
  }

  error(message: string, error?: any) {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error);
  }

  warn(message: string, data?: any) {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`, data);
  }
}