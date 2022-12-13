import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) { 
    this.init();
  }

  async init()
  {
    await this.storage.create();
  }
  
  async agregar(key: string, valor: any)
  {
    await this.storage.set(key, valor);
  }

  async leer(key: string)
  {
    return await this.storage.get(key);
  }

  async listar()
  {
    let listado = []
    await this.storage.forEach((v,k) => { listado.push(v[0]); });
    return listado;
  }

  async limpiar(){
    await this.storage.clear();
  }
}
