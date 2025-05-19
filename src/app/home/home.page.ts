import { Component } from '@angular/core';
import { IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonIcon, IonList, IonHeader, IonToolbar, IonTitle, IonContent,IonButton, IonLabel, IonItem , IonInput} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation'
import { NgIf } from '@angular/common';
import { Firestore, collection, addDoc, collectionData, query, orderBy } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [FormsModule , IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonList, IonItem, IonLabel, IonButton, IonHeader, IonToolbar, IonTitle, IonContent , NgIf, IonInput],
})

export class HomePage {
  latitude : number | null = null;
  longitude : number | null = null;
  nombre : string ='';
  apellido : string ='';

  constructor(private firestore: Firestore) {}

  async obtenerUbicacion() {
    return new Promise<void>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            resolve();
          },
          (error) => {
            console.error('Error obteniendo ubicación', error);
            reject(error);
            alert('Error obteniendo ubicación');
          }
        );
      } else {
        console.error('Geolocalización no compatible con este navegador.');
        reject('Geolocalización no compatible con este navegador.');
        alert('Geolocalización no compatible con este navegador.');
      }
    });
  }

  async abrirEnGoogleMaps() {
    await this.obtenerUbicacion();
    if (this.latitude && this.longitude) {
      const url = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
      window.open(url, '_blank');
    }
  }

  async guardarEnFirebase() {
    if (this.nombre.trim() !== '' && this.apellido.trim() !== '') {
      await this.obtenerUbicacion();
      if (this.latitude && this.longitude) {
        const url = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
        try {
          const usuariosRef = collection(this.firestore, 'ubicacionesMireya');
          await addDoc(usuariosRef, {
            nombre: this.nombre,
            apellido: this.apellido,
            latitude: this.latitude,
            longitude: this.longitude,
            url: url
          });
          console.log('Usuario guardado en Firestore');
          alert('Usuario guardado en Firestore');
        } catch (error) {
          console.error('Error guardando usuario en Firestore', error);
          alert('Error guardando usuario en Firestore');
        }
      }
    } else {
      console.warn('Nombre y apellido son requeridos');
      alert('Nombre y apellido son requeridos');
    }
  }
}
