import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

class Tarea {
  id:number;
  tarea:string;
  constructor(id: number, tarea: string) {
    this.id = id;
    this.tarea = tarea
  }
}


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  value: string;
  tareas:Array<Tarea>;
  tareas_not:Array<Tarea>;
  constructor() { 
    this.value = "";
    if (localStorage.getItem("tareas") && localStorage.getItem("tareas_not")) {
      let _tareas = localStorage.getItem("tareas");
      let _tareas_not = localStorage.getItem("tareas_not");
      if (_tareas && _tareas_not) {
        this.tareas = this.Transformar(JSON.parse(_tareas));
        this.tareas_not = this.Transformar(JSON.parse(_tareas_not));
      } else {
        this.tareas = []
        this.tareas_not = []
      } 
    } else {
      this.tareas = []
      this.tareas_not = []
    }
  }

  ngOnInit(): void {
    
  }

  agregarTarea() {
    let n_id = Math.round(Math.random()*100)
    let result = false;
    for (let item of this.tareas) {
      if (item.id == n_id) {
        result = true;
      }
    }

    while (result) {
      n_id = Math.round(Math.random()*100)
      result = false;
      for (let item of this.tareas) {
        if (item.id == n_id) {
          result = true;
        }
      }
    }
        
    this.tareas.push(new Tarea(n_id, this.value));
    this.value="";
  }
  eliminarTarea(id: number, tarea: string) {
    let _index = 0;
    let _agregar;
    for (let _tarea of this.tareas) {
      if (_tarea.id == id) {
        _agregar = new Tarea(_tarea.id, _tarea.tarea);
        break;
      }
      _index ++;
    } 
    this.tareas.splice(_index, 1)
    if (_agregar) {
      this.tareas_not.push(_agregar)
    }
    
  }
  eliminarTareasNot() {
    this.tareas_not.splice(0, this.tareas_not.length)
  }
  guardarListas() {
    localStorage.setItem("tareas", JSON.stringify(this.tareas));
    localStorage.setItem("tareas_not", JSON.stringify(this.tareas_not));
  }
  Transformar(list: Array<any>) {
    let _lista: Array<any> = []
    for (let _tarea of list) {
      _lista.push(new Tarea(_tarea["id"], _tarea["tarea"]))
    }
    return _lista;
  }
}
