import { Injectable } from '@angular/core';
import { Parent } from '../models/Parent';
import { Student } from '../models/Student';
import { Class } from '../models/Class';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  private parents: Parent[];

  constructor() { 
    this.parents = [
      new Parent('Barabba', 'Condigliano', 'b@c.com', [new Student('Barabbina', 'Condigliano', 'bb@c.com', new Class(3,'A','T'))]),
      new Parent('Tripalovski', 'HardBass', 't@h.com', [])
    ]
  }

  public getParents(){
    return this.parents;
  }
}
